# Training Dataset Guide

## Overview

The training script now uses **real PlantVillage dataset** from Cloud Storage instead of mock data.

## Dataset: PlantVillage

- **Size:** 54,306 images
- **Classes:** 38 crop-disease pairs
- **Splits:** Train (80%) / Validation (20%)
- **Format:** JPG images, 224x224 pixels
- **Source:** [Kaggle PlantVillage Dataset](https://www.kaggle.com/datasets/emmarex/plantdisease)

## Quick Start

### 1. Prepare Dataset

```bash
# Install dependencies
pip install kaggle google-cloud-storage

# Set up Kaggle API (get API key from kaggle.com/settings)
mkdir ~/.kaggle
# Copy your kaggle.json to ~/.kaggle/

# Run preparation script
cd ml
python prepare_dataset.py
```

This will:
- ✅ Download PlantVillage from Kaggle
- ✅ Upload to Cloud Storage (`gs://kenya-agri-farmwise-ml/datasets/plantvillage/`)
- ✅ Create dataset import CSV
- ✅ Verify upload

### 2. Train Model

**Option A: Using Docker (Recommended)**
```bash
# Build training container
cd ml
gcloud builds submit --tag gcr.io/kenya-agri-farmwise/crop-disease-trainer

# Submit training job
gcloud ai custom-jobs create \
    --region=us-central1 \
    --display-name=crop-disease-training \
    --config=training_config.yaml
```

**Option B: Local Training (for testing)**
```bash
# Set environment variables
export GCS_BUCKET=kenya-agri-farmwise-ml
export AIP_MODEL_DIR=./output/model
export AIP_CHECKPOINT_DIR=./output/checkpoints

# Run training
python train_model.py --epochs=50 --batch-size=32
```

### 3. Monitor Training

```bash
# View training job status
gcloud ai custom-jobs list --region=us-central1

# Stream logs
gcloud ai custom-jobs stream-logs JOB_ID --region=us-central1

# View TensorBoard
tensorboard --logdir=gs://kenya-agri-farmwise-ml/models/crop-disease-detector/logs
```

## Dataset Structure

```
gs://kenya-agri-farmwise-ml/
└── datasets/
    └── plantvillage/
        ├── train/
        │   ├── Apple___Apple_scab/
        │   │   ├── image001.jpg
        │   │   ├── image002.jpg
        │   │   └── ...
        │   ├── Corn_(maize)___Common_rust_/
        │   ├── Tomato___Late_blight/
        │   └── ... (38 classes total)
        └── val/
            └── (same structure as train)
```

## Training Features

### Data Augmentation
- Random horizontal flip
- Random brightness adjustment (±20%)
- Random contrast (0.8-1.2x)
- Random saturation (0.8-1.2x)
- Random rotation (0°, 90°, 180°, 270°)

### Model Architecture
- **Base:** EfficientNetB4 (pre-trained on ImageNet)
- **Custom Head:**
  - Global Average Pooling
  - Batch Normalization
  - Dropout (0.3)
  - Dense (512 units, ReLU)
  - Batch Normalization
  - Dropout (0.3)
  - Dense (38 units, Softmax)

### Training Strategy
1. **Phase 1:** Train with frozen base (25 epochs)
   - Learning rate: 0.001
   - Only train custom head
2. **Phase 2:** Fine-tune entire model (25 epochs)
   - Learning rate: 0.0001
   - Unfreeze all layers

### Callbacks
- **Early Stopping:** Stop if val_loss doesn't improve for 5 epochs
- **Reduce LR:** Reduce learning rate by 0.2x if val_loss plateaus
- **Model Checkpoint:** Save best model based on val_accuracy
- **TensorBoard:** Log metrics for visualization
- **CSV Logger:** Save training history

## Expected Results

After training, you should see:
- **Accuracy:** 90-95%
- **Top-3 Accuracy:** 97-99%
- **Training Time:** 2-4 hours (with GPU)

## Output Files

Training produces:
```
gs://kenya-agri-farmwise-ml/models/crop-disease-detector/
├── saved_model/           # TensorFlow SavedModel
├── class_names.json       # List of disease classes
├── metrics.json           # Final evaluation metrics
├── training_log.csv       # Training history
└── logs/                  # TensorBoard logs
```

## Troubleshooting

### Issue: "No module named 'kaggle'"
```bash
pip install kaggle
```

### Issue: "403 Forbidden" when downloading from Kaggle
- Get API key from https://www.kaggle.com/settings
- Save to `~/.kaggle/kaggle.json`
- Set permissions: `chmod 600 ~/.kaggle/kaggle.json`

### Issue: "Permission denied" for Cloud Storage
```bash
gcloud auth application-default login
```

### Issue: Training is slow
- Use GPU: Update `training_config.yaml` to use `NVIDIA_TESLA_T4`
- Reduce batch size if out of memory
- Use fewer epochs for testing

## Next Steps

After training:
1. Deploy model to Vertex AI Endpoint
2. Update prediction API with endpoint ID
3. Test disease detection in the app
4. Collect Kenya-specific data for fine-tuning

## Cost Estimate

- **Dataset storage:** ~$0.50/month (2GB)
- **Training (GPU):** ~$5-10 per run
- **Model storage:** ~$0.10/month

Total: ~$10-15 for initial setup
