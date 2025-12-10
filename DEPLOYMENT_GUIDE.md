# Google Cloud Deployment Guide

## Quick Start - Deploy Disease Detection AI

This guide will help you deploy the crop disease detection AI model to Google Cloud.

### Prerequisites

1. **Google Cloud Account** with billing enabled
2. **Google Cloud SDK** installed locally
3. **Python 3.9+** installed
4. **Node.js 18+** installed

---

## Step 1: Set Up Google Cloud Project

```bash
# Install Google Cloud SDK
# Windows: Download from https://cloud.google.com/sdk/docs/install
# Mac: brew install google-cloud-sdk
# Linux: See https://cloud.google.com/sdk/docs/install

# Login to Google Cloud
gcloud auth login

# Create new project
gcloud projects create kenya-agri-farmwise --name="Kenya AgriConnect"

# Set project
gcloud config set project kenya-agri-farmwise

# Enable required APIs
gcloud services enable aiplatform.googleapis.com
gcloud services enable storage.googleapis.com
gcloud services enable cloudfunctions.googleapis.com
gcloud services enable cloudbuild.googleapis.com

# Create service account
gcloud iam service-accounts create vertex-ai-service \
    --display-name="Vertex AI Service Account"

# Grant permissions
gcloud projects add-iam-policy-binding kenya-agri-farmwise \
    --member="serviceAccount:vertex-ai-service@kenya-agri-farmwise.iam.gserviceaccount.com" \
    --role="roles/aiplatform.user"

gcloud projects add-iam-policy-binding kenya-agri-farmwise \
    --member="serviceAccount:vertex-ai-service@kenya-agri-farmwise.iam.gserviceaccount.com" \
    --role="roles/storage.admin"
```

---

## Step 2: Create Cloud Storage Bucket

```bash
# Create bucket for datasets and models
gsutil mb -l us-central1 gs://kenya-agri-farmwise-ml

# Create folders
gsutil mkdir gs://kenya-agri-farmwise-ml/datasets
gsutil mkdir gs://kenya-agri-farmwise-ml/models
gsutil mkdir gs://kenya-agri-farmwise-ml/uploads
```

---

## Step 3: Prepare Training Data

### Download PlantVillage Dataset

```bash
# Install Kaggle CLI
pip install kaggle

# Download dataset (requires Kaggle API key)
kaggle datasets download -d emmarex/plantdisease

# Unzip
unzip plantdisease.zip -d plantvillage_dataset

# Upload to Cloud Storage
gsutil -m cp -r plantvillage_dataset/train gs://kenya-agri-farmwise-ml/datasets/plant-disease/
gsutil -m cp -r plantvillage_dataset/val gs://kenya-agri-farmwise-ml/datasets/plant-disease/
```

---

## Step 4: Train the Model

```bash
# Navigate to ML directory
cd ml

# Install dependencies
pip install -r requirements.txt

# Update configuration in train_model.py
# - PROJECT_ID = "kenya-agri-farmwise"
# - BUCKET_NAME = "kenya-agri-farmwise-ml"

# Run training (this will take 2-4 hours)
python train_model.py
```

**Note:** For faster training, use Vertex AI Custom Training Jobs with GPUs:

```bash
# Submit training job to Vertex AI
gcloud ai custom-jobs create \
    --region=us-central1 \
    --display-name=crop-disease-training \
    --worker-pool-spec=machine-type=n1-standard-8,accelerator-type=NVIDIA_TESLA_T4,accelerator-count=1,replica-count=1,container-image-uri=gcr.io/deeplearning-platform-release/tf2-gpu.2-12:latest,local-package-path=.,script=train_model.py
```

---

## Step 5: Deploy Cloud Function

```bash
# Navigate to functions directory
cd functions/predict_disease

# Deploy function
gcloud functions deploy predict_disease \
    --runtime python311 \
    --trigger-http \
    --allow-unauthenticated \
    --region us-central1 \
    --memory 2GB \
    --timeout 60s \
    --set-env-vars GCP_PROJECT_ID=kenya-agri-farmwise,GCP_REGION=us-central1,VERTEX_AI_ENDPOINT_ID=YOUR_ENDPOINT_ID,GCS_BUCKET_NAME=kenya-agri-farmwise-ml

# Get function URL
gcloud functions describe predict_disease --region us-central1 --format="value(httpsTrigger.url)"
```

---

## Step 6: Configure Frontend

Update your `.env` file:

```env
# Add the Cloud Function URL from Step 5
VITE_DISEASE_PREDICTION_API=https://us-central1-kenya-agri-farmwise.cloudfunctions.net/predict_disease

# Add Google Cloud configuration
VITE_GCP_PROJECT_ID=kenya-agri-farmwise
VITE_GCP_REGION=us-central1
VITE_GCS_BUCKET_NAME=kenya-agri-farmwise-ml
```

---

## Step 7: Test the Integration

```bash
# Start development server
npm run dev

# Navigate to http://localhost:5173/dashboard/disease-detection
# Upload a crop image and test the AI detection
```

---

## Step 8: Deploy Frontend to Cloud Run (Optional)

```bash
# Build Docker image
docker build -t gcr.io/kenya-agri-farmwise/frontend .

# Push to Container Registry
docker push gcr.io/kenya-agri-farmwise/frontend

# Deploy to Cloud Run
gcloud run deploy kenya-agri-farmwise \
    --image gcr.io/kenya-agri-farmwise/frontend \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --memory 512Mi
```

---

## Monitoring & Logging

### View Logs

```bash
# Cloud Function logs
gcloud functions logs read predict_disease --region us-central1

# Vertex AI logs
gcloud ai endpoints list --region us-central1
```

### Set Up Monitoring

```bash
# Create uptime check
gcloud monitoring uptime create predict-disease-uptime \
    --display-name="Disease Prediction API" \
    --resource-type=uptime-url \
    --monitored-resource=https://us-central1-kenya-agri-farmwise.cloudfunctions.net/predict_disease
```

---

## Cost Optimization

1. **Use Preemptible VMs** for training (70% cheaper)
2. **Set up budget alerts** to avoid unexpected costs
3. **Use Cloud Storage lifecycle policies** to delete old uploads
4. **Enable auto-scaling** on Cloud Run

```bash
# Set budget alert
gcloud billing budgets create \
    --billing-account=YOUR_BILLING_ACCOUNT \
    --display-name="Monthly Budget" \
    --budget-amount=100USD \
    --threshold-rule=percent=50 \
    --threshold-rule=percent=90
```

---

## Troubleshooting

### Issue: Model training fails

**Solution:** Check that dataset is properly uploaded to Cloud Storage

```bash
gsutil ls gs://kenya-agri-farmwise-ml/datasets/plant-disease/
```

### Issue: Cloud Function timeout

**Solution:** Increase timeout and memory

```bash
gcloud functions deploy predict_disease \
    --timeout 120s \
    --memory 4GB
```

### Issue: Prediction accuracy is low

**Solution:** 
1. Collect more training data
2. Increase training epochs
3. Use data augmentation
4. Try different model architectures

---

## Next Steps

1. ✅ Deploy disease detection AI
2. ⏭️ Add Gemini chatbot for farmer questions
3. ⏭️ Implement price prediction model
4. ⏭️ Add Google Maps integration
5. ⏭️ Set up BigQuery analytics

---

## Support

- **Google Cloud Documentation**: https://cloud.google.com/docs
- **Vertex AI Guide**: https://cloud.google.com/vertex-ai/docs
- **Community Support**: https://stackoverflow.com/questions/tagged/google-cloud-platform
