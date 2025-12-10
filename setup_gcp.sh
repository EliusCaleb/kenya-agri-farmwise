#!/bin/bash

# Google Cloud Setup Script
# Run this BEFORE preparing dataset or training

set -e  # Exit on error

# Configuration
PROJECT_ID="alx-hackathon-480307"
REGION="us-central1"
BUCKET_NAME="kenya-agri-farmwise-ml"

echo "=========================================="
echo "Google Cloud Initial Setup"
echo "=========================================="
echo ""

# Step 1: Set project
echo "📋 Step 1: Setting Google Cloud project..."
gcloud config set project $PROJECT_ID
echo "✅ Project set to: $PROJECT_ID"
echo ""

# Step 2: Enable required APIs
echo "🔧 Step 2: Enabling required APIs..."
echo "This may take a few minutes..."
gcloud services enable \
    aiplatform.googleapis.com \
    storage.googleapis.com \
    cloudbuild.googleapis.com \
    run.googleapis.com

echo "✅ APIs enabled"
echo ""

# Step 3: Create Cloud Storage bucket
echo "💾 Step 3: Creating Cloud Storage bucket..."
if gsutil ls -b gs://$BUCKET_NAME 2>/dev/null; then
    echo "ℹ️  Bucket already exists: gs://$BUCKET_NAME"
else
    gsutil mb -l $REGION gs://$BUCKET_NAME
    echo "✅ Bucket created: gs://$BUCKET_NAME"
fi
echo ""

# Step 4: Create bucket folders
echo "📁 Step 4: Creating bucket folders..."
gsutil mkdir gs://$BUCKET_NAME/datasets 2>/dev/null || true
gsutil mkdir gs://$BUCKET_NAME/models 2>/dev/null || true
gsutil mkdir gs://$BUCKET_NAME/uploads 2>/dev/null || true
echo "✅ Folders created"
echo ""

# Step 5: Set up authentication
echo "🔐 Step 5: Setting up authentication..."
gcloud auth application-default login
echo "✅ Authentication configured"
echo ""

# Summary
echo "=========================================="
echo "✅ Setup Complete!"
echo "=========================================="
echo ""
echo "Bucket created: gs://$BUCKET_NAME"
echo "Region: $REGION"
echo ""
echo "Next steps:"
echo "1. Prepare dataset:"
echo "   cd ml"
echo "   python prepare_dataset.py"
echo ""
echo "2. Train model:"
echo "   gcloud ai custom-jobs create --config=ml/training_config.yaml"
echo ""
