# Google Cloud Setup Script (Windows)
# Run this BEFORE preparing dataset or training

# Configuration
$PROJECT_ID = "alx-hackathon-480307"
$REGION = "us-central1"
$BUCKET_NAME = "kenya-agri-farmwise-ml"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Google Cloud Initial Setup" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Set project
Write-Host "📋 Step 1: Setting Google Cloud project..." -ForegroundColor Yellow
gcloud config set project $PROJECT_ID
Write-Host "✅ Project set to: $PROJECT_ID" -ForegroundColor Green
Write-Host ""

# Step 2: Enable required APIs
Write-Host "🔧 Step 2: Enabling required APIs..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Gray
gcloud services enable aiplatform.googleapis.com storage.googleapis.com cloudbuild.googleapis.com run.googleapis.com
Write-Host "✅ APIs enabled" -ForegroundColor Green
Write-Host ""

# Step 3: Create Cloud Storage bucket
Write-Host "💾 Step 3: Creating Cloud Storage bucket..." -ForegroundColor Yellow
$bucketExists = gsutil ls -b gs://$BUCKET_NAME 2>$null
if ($bucketExists) {
    Write-Host "ℹ️  Bucket already exists: gs://$BUCKET_NAME" -ForegroundColor Blue
} else {
    gsutil mb -l $REGION gs://$BUCKET_NAME
    Write-Host "✅ Bucket created: gs://$BUCKET_NAME" -ForegroundColor Green
}
Write-Host ""

# Step 4: Create bucket folders
Write-Host "📁 Step 4: Creating bucket folders..." -ForegroundColor Yellow
gsutil mkdir gs://$BUCKET_NAME/datasets 2>$null
gsutil mkdir gs://$BUCKET_NAME/models 2>$null
gsutil mkdir gs://$BUCKET_NAME/uploads 2>$null
Write-Host "✅ Folders created" -ForegroundColor Green
Write-Host ""

# Step 5: Set up authentication
Write-Host "🔐 Step 5: Setting up authentication..." -ForegroundColor Yellow
gcloud auth application-default login
Write-Host "✅ Authentication configured" -ForegroundColor Green
Write-Host ""

# Summary
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Bucket created: gs://$BUCKET_NAME" -ForegroundColor White
Write-Host "Region: $REGION" -ForegroundColor White
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Prepare dataset:" -ForegroundColor White
Write-Host "   cd ml" -ForegroundColor Gray
Write-Host "   python prepare_dataset.py" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Train model:" -ForegroundColor White
Write-Host "   gcloud ai custom-jobs create --config=ml/training_config.yaml" -ForegroundColor Gray
Write-Host ""
