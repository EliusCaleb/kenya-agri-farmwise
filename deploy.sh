#!/bin/bash

# Complete Deployment Script for Kenya AgriConnect on Google Cloud
# This script deploys the entire application stack

set -e  # Exit on error

# Configuration
PROJECT_ID="kenya-agri-farmwise"
REGION="us-central1"
BUCKET_NAME="${PROJECT_ID}-ml"

echo "🚀 Starting deployment of Kenya AgriConnect to Google Cloud..."

# Step 1: Set up Google Cloud project
echo "📦 Step 1: Setting up Google Cloud project..."
gcloud config set project $PROJECT_ID

# Enable required APIs
echo "🔧 Enabling required APIs..."
gcloud services enable \
    aiplatform.googleapis.com \
    storage.googleapis.com \
    run.googleapis.com \
    cloudbuild.googleapis.com \
    artifactregistry.googleapis.com

# Step 2: Create Cloud Storage bucket
echo "💾 Step 2: Creating Cloud Storage bucket..."
gsutil mb -l $REGION gs://$BUCKET_NAME 2>/dev/null || echo "Bucket already exists"
gsutil mkdir gs://$BUCKET_NAME/datasets 2>/dev/null || true
gsutil mkdir gs://$BUCKET_NAME/models 2>/dev/null || true
gsutil mkdir gs://$BUCKET_NAME/uploads 2>/dev/null || true

# Step 3: Build and push training container
echo "🐳 Step 3: Building ML training container..."
cd ml
gcloud builds submit \
    --tag gcr.io/$PROJECT_ID/crop-disease-trainer:latest \
    --timeout=20m

# Step 4: Submit training job (optional - can be done separately)
echo "🎓 Step 4: Training job ready (run separately with training data)"
echo "   To train: gcloud ai custom-jobs create --config=training_config.yaml"

# Step 5: Build and deploy prediction API
echo "🔮 Step 5: Deploying prediction API to Cloud Run..."
cd ../functions/predict_disease

# Build container
gcloud builds submit \
    --tag gcr.io/$PROJECT_ID/disease-prediction-api:latest

# Deploy to Cloud Run
gcloud run deploy disease-prediction-api \
    --image gcr.io/$PROJECT_ID/disease-prediction-api:latest \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --memory 2Gi \
    --cpu 2 \
    --timeout 60s \
    --set-env-vars GCP_PROJECT_ID=$PROJECT_ID,GCP_REGION=$REGION,GCS_BUCKET_NAME=$BUCKET_NAME

# Get API URL
API_URL=$(gcloud run services describe disease-prediction-api --region $REGION --format="value(status.url)")
echo "✅ Prediction API deployed at: $API_URL"

# Step 6: Build and deploy frontend
echo "🎨 Step 6: Deploying frontend to Cloud Run..."
cd ../..

# Create production .env file
cat > .env.production << EOF
VITE_DISEASE_PREDICTION_API=${API_URL}/predict
VITE_GCP_PROJECT_ID=$PROJECT_ID
VITE_GCP_REGION=$REGION
VITE_GCS_BUCKET_NAME=$BUCKET_NAME
VITE_SUPABASE_PROJECT_ID=$VITE_SUPABASE_PROJECT_ID
VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY
VITE_SUPABASE_URL=$VITE_SUPABASE_URL
EOF

# Build frontend container
gcloud builds submit \
    --tag gcr.io/$PROJECT_ID/frontend:latest

# Deploy frontend to Cloud Run
gcloud run deploy kenya-agri-farmwise \
    --image gcr.io/$PROJECT_ID/frontend:latest \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --memory 512Mi \
    --cpu 1

# Get frontend URL
FRONTEND_URL=$(gcloud run services describe kenya-agri-farmwise --region $REGION --format="value(status.url)")
echo "✅ Frontend deployed at: $FRONTEND_URL"

# Step 7: Set up monitoring
echo "📊 Step 7: Setting up monitoring..."
gcloud monitoring uptime create disease-api-uptime \
    --display-name="Disease Prediction API Uptime" \
    --resource-type=uptime-url \
    --monitored-resource="${API_URL}/health" \
    2>/dev/null || echo "Uptime check already exists"

# Summary
echo ""
echo "🎉 Deployment Complete!"
echo "================================"
echo "Frontend URL:     $FRONTEND_URL"
echo "Prediction API:   $API_URL"
echo "GCS Bucket:       gs://$BUCKET_NAME"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Upload training data to gs://$BUCKET_NAME/datasets/"
echo "2. Run training job to create the AI model"
echo "3. Deploy model to Vertex AI endpoint"
echo "4. Update VERTEX_AI_ENDPOINT_ID in Cloud Run environment"
echo ""
