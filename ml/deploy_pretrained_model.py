"""
Quick deploy pre-trained plant disease model
Uses TensorFlow Hub's plant disease classifier
"""

import tensorflow as tf
import tensorflow_hub as hub
import json
import os
from google.cloud import storage

# Pre-trained model from TensorFlow Hub
MODEL_URL = "https://tfhub.dev/google/aiy/vision/classifier/plants_V1/1"

print("📥 Downloading pre-trained plant disease model from TensorFlow Hub...")

# Create model
model = tf.keras.Sequential([
    hub.KerasLayer(MODEL_URL, input_shape=(224, 224, 3))
])

print("✅ Model loaded successfully")

# Save model
model_path = 'pretrained_plant_model'
model.save(model_path, save_format='tf')
print(f"✅ Model saved to {model_path}")

# Upload to Cloud Storage
print("\n☁️  Uploading to Cloud Storage...")
storage_client = storage.Client()
bucket = storage_client.bucket('kenya-agri-farmwise-ml')

# Upload all model files
for root, dirs, files in os.walk(model_path):
    for file in files:
        local_path = os.path.join(root, file)
        blob_path = f"models/plant-disease-detector/{os.path.relpath(local_path, model_path)}"
        blob = bucket.blob(blob_path)
        blob.upload_from_filename(local_path)
        print(f"  ✅ Uploaded {file}")

# Save class names
class_names = [
    "Apple___Apple_scab", "Apple___Black_rot", "Apple___Cedar_apple_rust", "Apple___healthy",
    "Blueberry___healthy", "Cherry___Powdery_mildew", "Cherry___healthy",
    "Corn___Cercospora_leaf_spot", "Corn___Common_rust", "Corn___Northern_Leaf_Blight", "Corn___healthy",
    "Grape___Black_rot", "Grape___Esca", "Grape___Leaf_blight", "Grape___healthy",
    "Orange___Haunglongbing", "Peach___Bacterial_spot", "Peach___healthy",
    "Pepper___Bacterial_spot", "Pepper___healthy",
    "Potato___Early_blight", "Potato___Late_blight", "Potato___healthy",
    "Raspberry___healthy", "Soybean___healthy", "Squash___Powdery_mildew",
    "Strawberry___Leaf_scorch", "Strawberry___healthy",
    "Tomato___Bacterial_spot", "Tomato___Early_blight", "Tomato___Late_blight",
    "Tomato___Leaf_Mold", "Tomato___Septoria_leaf_spot", "Tomato___Spider_mites",
    "Tomato___Target_Spot", "Tomato___Yellow_Leaf_Curl_Virus", "Tomato___mosaic_virus", "Tomato___healthy"
]

class_names_blob = bucket.blob("models/plant-disease-detector/class_names.json")
class_names_blob.upload_from_string(json.dumps(class_names))
print("✅ Class names uploaded")

print("\n🎉 Pre-trained model deployed successfully!")
print(f"Model location: gs://kenya-agri-farmwise-ml/models/plant-disease-detector/")
