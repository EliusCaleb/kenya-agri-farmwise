# Complete Setup Instructions - Kenya AgriConnect

## 📋 Prerequisites

Before you begin, make sure you have:

1. ✅ **Google Cloud Account** with billing enabled
2. ✅ **Google Cloud SDK** installed ([Download here](https://cloud.google.com/sdk/docs/install))
3. ✅ **Python 3.9+** installed
4. ✅ **Git** installed
5. ✅ **Node.js 18+** (for frontend)

## 🚀 Step-by-Step Setup

### Step 1: Initial Google Cloud Setup

**Windows (PowerShell):**
```powershell
# Run the setup script
.\setup_gcp.ps1
```

**Mac/Linux:**
```bash
# Make script executable
chmod +x setup_gcp.sh

# Run the setup script
./setup_gcp.sh
```

This script will:
- ✅ Set your Google Cloud project to `alx-hackathon-480307`
- ✅ Enable required APIs (Vertex AI, Cloud Storage, Cloud Run, Cloud Build)
- ✅ Create Cloud Storage bucket: `gs://alx-hackathon-480307-ml`
- ✅ Set up authentication

**Expected Output:**
```
✅ Setup Complete!
Bucket created: gs://alx-hackathon-480307-ml
Region: us-central1
```

---

### Step 2: Prepare Training Dataset

```bash
# Navigate to ML directory
cd ml

# Install Python dependencies
pip install -r requirements.txt

# Download and upload PlantVillage dataset
python prepare_dataset.py
```

**What happens:**
1. Downloads PlantVillage dataset (54,306 images) using kagglehub
2. Uploads to `gs://alx-hackathon-480307-ml/datasets/plantvillage/`
3. Creates dataset CSV for Vertex AI
4. Verifies upload

**Time:** ~15-30 minutes (depending on internet speed)

**Expected Output:**
```
✅ Dataset preparation complete!
```

---

### Step 3: Build Training Container

```bash
# Build Docker container for training
cd ml
gcloud builds submit --tag gcr.io/alx-hackathon-480307/crop-disease-trainer
```

**Time:** ~5-10 minutes

---

### Step 4: Train the AI Model

**Option A: Using Vertex AI (Recommended)**
```bash
# Submit training job with GPU
gcloud ai custom-jobs create \
    --region=us-central1 \
    --display-name=crop-disease-training \
    --config=training_config.yaml
```

**Option B: Local Training (for testing)**
```bash
# Set environment variables
export GCS_BUCKET=alx-hackathon-480307-ml
export AIP_MODEL_DIR=./output/model
export AIP_CHECKPOINT_DIR=./output/checkpoints

# Run training locally
python train_model.py --epochs=10  # Use fewer epochs for testing
```

**Training Time:**
- With GPU (Vertex AI): 2-4 hours
- Without GPU (local): 8-12 hours

**Monitor Training:**
```bash
# List training jobs
gcloud ai custom-jobs list --region=us-central1

# Stream logs
gcloud ai custom-jobs stream-logs JOB_ID --region=us-central1
```

---

### Step 5: Deploy Model to Vertex AI

After training completes:

```bash
# Upload model to Vertex AI
gcloud ai models upload \
    --region=us-central1 \
    --display-name=crop-disease-detector-v1 \
    --container-image-uri=us-docker.pkg.dev/vertex-ai/prediction/tf2-cpu.2-12:latest \
    --artifact-uri=gs://alx-hackathon-480307-ml/models/crop-disease-detector/saved_model

# Create endpoint
gcloud ai endpoints create \
    --region=us-central1 \
    --display-name=crop-disease-endpoint

# Deploy model to endpoint
gcloud ai endpoints deploy-model ENDPOINT_ID \
    --region=us-central1 \
    --model=MODEL_ID \
    --display-name=crop-disease-v1 \
    --machine-type=n1-standard-4 \
    --min-replica-count=1 \
    --max-replica-count=3
```

**Save the Endpoint ID** - you'll need it for the prediction API!

---

### Step 6: Build and Deploy Prediction API

```bash
# Navigate to prediction API directory
cd functions/predict_disease

# Build container
gcloud builds submit --tag gcr.io/alx-hackathon-480307/disease-prediction-api

# Deploy to Cloud Run
gcloud run deploy disease-prediction-api \
    --image gcr.io/alx-hackathon-480307/disease-prediction-api \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --memory 2Gi \
    --cpu 2 \
    --set-env-vars GCP_PROJECT_ID=alx-hackathon-480307,GCP_REGION=us-central1,VERTEX_AI_ENDPOINT_ID=YOUR_ENDPOINT_ID,GCS_BUCKET_NAME=alx-hackathon-480307-ml
```

**Replace `YOUR_ENDPOINT_ID`** with the endpoint ID from Step 5.

**Get API URL:**
```bash
gcloud run services describe disease-prediction-api \
    --region us-central1 \
    --format="value(status.url)"
```

---

### Step 7: Build and Deploy Frontend

```bash
# Navigate to project root
cd ../..

# Update .env with API URL
echo "VITE_DISEASE_PREDICTION_API=https://disease-prediction-api-xxx.run.app/predict" >> .env

# Build frontend container
gcloud builds submit --tag gcr.io/alx-hackathon-480307/frontend

# Deploy to Cloud Run
gcloud run deploy kenya-agri-farmwise \
    --image gcr.io/alx-hackathon-480307/frontend \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --memory 512Mi
```

**Get Frontend URL:**
```bash
gcloud run services describe kenya-agri-farmwise \
    --region us-central1 \
    --format="value(status.url)"
```

---

## 🎉 You're Done!

Your application is now live! Visit the frontend URL to see it in action.

### URLs Summary

- **Frontend:** `https://kenya-agri-farmwise-xxx.run.app`
- **Prediction API:** `https://disease-prediction-api-xxx.run.app`
- **Cloud Storage:** `gs://alx-hackathon-480307-ml`

---

## 🧪 Testing

### Test Disease Detection

1. Go to your frontend URL
2. Sign up as a farmer
3. Navigate to "Disease Detection"
4. Upload a crop image
5. Click "Analyze Crop"
6. View AI prediction results!

### Test API Directly

```bash
# Test health endpoint
curl https://disease-prediction-api-xxx.run.app/health

# Test prediction (with base64 image)
curl -X POST https://disease-prediction-api-xxx.run.app/predict \
    -H "Content-Type: application/json" \
    -d '{"image": "BASE64_IMAGE_STRING"}'
```

---

## 💰 Cost Estimate

| Service | Monthly Cost |
|---------|-------------|
| Cloud Storage (100GB) | $2 |
| Cloud Run (Frontend) | $0.50 |
| Cloud Run (API) | $25 |
| Vertex AI Predictions (10K) | $50 |
| **Total** | **~$77.50/month** |

**Free Tier:** Google Cloud offers $300 credits for 90 days!

---

## 🐛 Troubleshooting

### Issue: "Permission denied"
```bash
gcloud auth login
gcloud auth application-default login
```

### Issue: "Bucket already exists"
This is fine! The script will use the existing bucket.

### Issue: Training fails
- Check logs: `gcloud ai custom-jobs stream-logs JOB_ID`
- Verify dataset uploaded: `gsutil ls gs://alx-hackathon-480307-ml/datasets/plantvillage/`

### Issue: API returns errors
- Check Cloud Run logs: `gcloud run services logs read disease-prediction-api`
- Verify endpoint ID is correct
- Test endpoint: `gcloud ai endpoints predict ENDPOINT_ID --region=us-central1`

---

## 📚 Additional Resources

- [Vertex AI Documentation](https://cloud.google.com/vertex-ai/docs)
- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Training Guide](ml/TRAINING_GUIDE.md)
- [Deployment Architecture](gcp_deployment_architecture.md)

---

## 🎯 Next Steps

After deployment:

1. ✅ Test all features
2. ✅ Collect Kenya-specific crop images
3. ✅ Fine-tune model with local data
4. ✅ Add Gemini AI chatbot
5. ✅ Integrate Google Maps
6. ✅ Set up monitoring dashboards
7. ✅ Configure custom domain

---

## 📞 Support

Need help? Check:
- [GitHub Issues](https://github.com/NgangaKamau3/kenya-agri-farmwise/issues)
- [Google Cloud Support](https://cloud.google.com/support)
