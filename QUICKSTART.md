# 🚀 Quick Start - Deploy to Google Cloud

## One-Command Deployment

```bash
# Make deployment script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

That's it! The script will:
1. ✅ Set up Google Cloud project
2. ✅ Enable required APIs
3. ✅ Create Cloud Storage buckets
4. ✅ Build all Docker containers
5. ✅ Deploy prediction API
6. ✅ Deploy frontend
7. ✅ Set up monitoring

## Manual Deployment (Step-by-Step)

### 1. Prerequisites

```bash
# Install Google Cloud SDK
# Windows: https://cloud.google.com/sdk/docs/install
# Mac: brew install google-cloud-sdk
# Linux: curl https://sdk.cloud.google.com | bash

# Login
gcloud auth login

# Set project
gcloud config set project kenya-agri-farmwise
```

### 2. Build Containers

```bash
# Build training container
cd ml
gcloud builds submit --tag gcr.io/kenya-agri-farmwise/crop-disease-trainer

# Build API container
cd ../functions/predict_disease
gcloud builds submit --tag gcr.io/kenya-agri-farmwise/disease-prediction-api

# Build frontend container
cd ../..
gcloud builds submit --tag gcr.io/kenya-agri-farmwise/frontend
```

### 3. Deploy Services

```bash
# Deploy prediction API
gcloud run deploy disease-prediction-api \
    --image gcr.io/kenya-agri-farmwise/disease-prediction-api \
    --region us-central1 \
    --allow-unauthenticated

# Deploy frontend
gcloud run deploy kenya-agri-farmwise \
    --image gcr.io/kenya-agri-farmwise/frontend \
    --region us-central1 \
    --allow-unauthenticated
```

### 4. Train Model (Optional - can be done later)

```bash
# Submit training job
gcloud ai custom-jobs create \
    --region=us-central1 \
    --config=ml/training_config.yaml
```

## Verify Deployment

```bash
# Get frontend URL
gcloud run services describe kenya-agri-farmwise \
    --region us-central1 \
    --format="value(status.url)"

# Get API URL
gcloud run services describe disease-prediction-api \
    --region us-central1 \
    --format="value(status.url)"

# Test API health
curl https://disease-prediction-api-xxx.run.app/health
```

## Cost Estimate

**Monthly cost: ~$77.50**
- Cloud Run Frontend: $0.50
- Cloud Run API: $25
- Vertex AI Predictions: $50
- Cloud Storage: $2

**Free tier:** $300 credits for 90 days

## Next Steps

1. Upload training data to Cloud Storage
2. Train the AI model
3. Deploy model to Vertex AI endpoint
4. Update API with endpoint ID
5. Test disease detection feature

## Troubleshooting

**Issue:** Permission denied
```bash
# Grant yourself owner role
gcloud projects add-iam-policy-binding kenya-agri-farmwise \
    --member="user:your-email@gmail.com" \
    --role="roles/owner"
```

**Issue:** Build fails
```bash
# Check Cloud Build logs
gcloud builds list --limit=5
gcloud builds log BUILD_ID
```

**Issue:** Service won't start
```bash
# Check Cloud Run logs
gcloud run services logs read kenya-agri-farmwise --region us-central1
```

## Support

- 📖 Full docs: See `gcp_deployment_architecture.md`
- 🐛 Issues: https://github.com/NgangaKamau3/kenya-agri-farmwise/issues
- 💬 Questions: Open a discussion on GitHub
