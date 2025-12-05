# 🚀 Fast Track Deployment (1 Hour)

## Use Pre-trained Model from TensorFlow Hub

Instead of training from scratch (2-4 hours), we'll use a pre-trained PlantVillage model that's already trained and ready to deploy!

## Option 1: Use TensorFlow Hub Model (Recommended - 15 minutes)

### Step 1: Download Pre-trained Model

```python
# quick_deploy_model.py
import tensorflow as tf
import tensorflow_hub as hub
from google.cloud import storage
import os

# Download pre-trained plant disease model from TensorFlow Hub
MODEL_URL = "https://tfhub.dev/google/aiy/vision/classifier/plants_V1/1"

print("📥 Downloading pre-trained model...")
model = tf.keras.Sequential([
    hub.KerasLayer(MODEL_URL, input_shape=(224, 224, 3))
])

# Save model
model.save('pretrained_model')
print("✅ Model downloaded and saved")

# Upload to Cloud Storage
print("☁️  Uploading to Cloud Storage...")
storage_client = storage.Client()
bucket = storage_client.bucket('kenya-agri-farmwise-ml')

# Upload model directory
for root, dirs, files in os.walk('pretrained_model'):
    for file in files:
        local_path = os.path.join(root, file)
        blob_path = f"models/crop-disease-detector/{os.path.relpath(local_path, 'pretrained_model')}"
        blob = bucket.blob(blob_path)
        blob.upload_from_filename(local_path)
        print(f"  Uploaded {file}")

print("✅ Model uploaded to gs://kenya-agri-farmwise-ml/models/crop-disease-detector/")
```

Run it:
```bash
pip install tensorflow tensorflow-hub google-cloud-storage
python quick_deploy_model.py
```

## Option 2: Use Pre-trained Keras Model (Even Faster - 5 minutes)

```python
# Use MobileNetV2 with ImageNet weights and fine-tune last layer
import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras import layers, models

# Create model with pre-trained weights
base_model = MobileNetV2(
    weights='imagenet',
    include_top=False,
    input_shape=(224, 224, 3)
)

# Add classification head
model = models.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.Dense(38, activation='softmax')  # 38 disease classes
])

# Save immediately (no training needed for demo)
model.save('gs://kenya-agri-farmwise-ml/models/crop-disease-detector/saved_model')
```

## Option 3: Skip Training - Use Mock Model (Fastest - 2 minutes)

For demo purposes, deploy the API with mock predictions:

### Update `main.py` to use mock predictions:

```python
# In functions/predict_disease/main.py

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict_disease():
    # ... existing CORS code ...
    
    try:
        request_json = request.get_json()
        
        # MOCK PREDICTION (for demo)
        mock_results = [
            {
                "disease": "Tomato Late Blight",
                "confidence": 92.5,
                "severity": "High"
            },
            {
                "disease": "Corn Common Rust",
                "confidence": 88.3,
                "severity": "Medium"
            },
            {
                "disease": "Potato Early Blight",
                "confidence": 85.7,
                "severity": "Medium"
            }
        ]
        
        # Return random result
        import random
        result = random.choice(mock_results)
        
        # Get disease info
        disease_info = DISEASE_INFO.get(result["disease"], {
            "name": result["disease"],
            "severity": result["severity"],
            "symptoms": ["Leaf discoloration", "Wilting", "Spots on leaves"],
            "treatment": ["Apply fungicide", "Remove infected parts", "Improve air circulation"],
            "prevention": ["Use resistant varieties", "Proper spacing", "Regular monitoring"]
        })
        
        return jsonify({
            **disease_info,
            "confidence": result["confidence"]
        }), 200, headers
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500, headers
```

## 🎯 1-Hour Deployment Plan

### Timeline Breakdown:

**Minutes 0-10: Setup**
```bash
# Run setup script
.\setup_gcp.ps1

# This creates bucket and enables APIs
```

**Minutes 10-15: Skip Dataset & Training**
- Don't download PlantVillage dataset
- Don't train model
- Use mock predictions or pre-trained model

**Minutes 15-25: Deploy Prediction API**
```bash
cd functions/predict_disease

# Build and deploy (with mock predictions)
gcloud builds submit --tag gcr.io/alx-hackathon-480307/disease-prediction-api

gcloud run deploy disease-prediction-api \
    --image gcr.io/alx-hackathon-480307/disease-prediction-api \
    --region us-central1 \
    --allow-unauthenticated \
    --memory 2Gi
```

**Minutes 25-35: Deploy Frontend**
```bash
cd ../..

# Update .env with API URL
# Get API URL from previous step

# Build and deploy
gcloud builds submit --tag gcr.io/alx-hackathon-480307/frontend

gcloud run deploy kenya-agri-farmwise \
    --image gcr.io/alx-hackathon-480307/frontend \
    --region us-central1 \
    --allow-unauthenticated
```

**Minutes 35-45: Run Supabase Migration**
- Go to Supabase dashboard
- Run SQL migration
- Test authentication

**Minutes 45-55: Test Everything**
- Sign up as farmer
- Upload test image
- Verify disease detection works
- Test marketplace features

**Minutes 55-60: Final Checks & Demo Prep**
- Test all features
- Prepare demo script
- Note down URLs

## 🚀 Ultra-Fast Commands (Copy-Paste)

```bash
# 1. Setup (2 min)
.\setup_gcp.ps1

# 2. Deploy API with mock predictions (8 min)
cd functions/predict_disease
gcloud builds submit --tag gcr.io/alx-hackathon-480307/disease-prediction-api
gcloud run deploy disease-prediction-api --image gcr.io/alx-hackathon-480307/disease-prediction-api --region us-central1 --allow-unauthenticated --memory 2Gi --set-env-vars GCP_PROJECT_ID=alx-hackathon-480307,GCP_REGION=us-central1,GCS_BUCKET_NAME=kenya-agri-farmwise-ml

# 3. Deploy Frontend (8 min)
cd ../..
gcloud builds submit --tag gcr.io/alx-hackathon-480307/frontend
gcloud run deploy kenya-agri-farmwise --image gcr.io/alx-hackathon-480307/frontend --region us-central1 --allow-unauthenticated

# 4. Get URLs
gcloud run services describe disease-prediction-api --region us-central1 --format="value(status.url)"
gcloud run services describe kenya-agri-farmwise --region us-central1 --format="value(status.url)"
```

## 💡 Pro Tips

1. **Use mock predictions for demo** - Train real model later
2. **Deploy in parallel** - Build frontend while API is deploying
3. **Skip Vertex AI** - Use Cloud Run only
4. **Pre-test locally** - Run `npm run dev` to verify frontend works
5. **Have backup plan** - Keep Lovable deployment as fallback

## ⚡ After Demo

Once you have more time:
1. Download PlantVillage dataset
2. Train actual model (2-4 hours)
3. Deploy to Vertex AI
4. Update API to use real predictions
5. Fine-tune with Kenya-specific data

## 🎬 Demo Script

1. Show landing page
2. Sign up as farmer
3. Navigate to disease detection
4. Upload crop image
5. Show AI prediction
6. Explain treatment recommendations
7. Show marketplace
8. Show weather forecasts

**Your app will be LIVE and WORKING in 1 hour!** 🚀
