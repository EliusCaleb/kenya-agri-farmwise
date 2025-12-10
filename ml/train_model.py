"""
Vertex AI Crop Disease Detection - Production Training Script
Trains on PlantVillage dataset from Cloud Storage
"""

import os
import argparse
import json
import tensorflow as tf
from google.cloud import storage
from tensorflow.keras.applications import EfficientNetB4
from tensorflow.keras import layers, models, callbacks
import numpy as np

# Configuration from environment variables (set by Vertex AI)
PROJECT_ID = os.environ.get('CLOUD_ML_PROJECT_ID', 'kenya-agri-farmwise')
REGION = os.environ.get('CLOUD_ML_REGION', 'us-central1')
BUCKET_NAME = os.environ.get('GCS_BUCKET', 'kenya-agri-farmwise-ml')
MODEL_DIR = os.environ.get('AIP_MODEL_DIR', '/tmp/model')
CHECKPOINT_DIR = os.environ.get('AIP_CHECKPOINT_DIR', '/tmp/checkpoints')

# Dataset paths in Cloud Storage
TRAIN_DATA_PATH = f"gs://{BUCKET_NAME}/datasets/plantvillage/train"
VAL_DATA_PATH = f"gs://{BUCKET_NAME}/datasets/plantvillage/val"

# Model parameters
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 50
LEARNING_RATE = 0.001

# PlantVillage disease classes
CLASS_NAMES = [
    "Apple___Apple_scab",
    "Apple___Black_rot",
    "Apple___Cedar_apple_rust",
    "Apple___healthy",
    "Blueberry___healthy",
    "Cherry_(including_sour)___Powdery_mildew",
    "Cherry_(including_sour)___healthy",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
    "Corn_(maize)___Common_rust_",
    "Corn_(maize)___Northern_Leaf_Blight",
    "Corn_(maize)___healthy",
    "Grape___Black_rot",
    "Grape___Esca_(Black_Measles)",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    "Grape___healthy",
    "Orange___Haunglongbing_(Citrus_greening)",
    "Peach___Bacterial_spot",
    "Peach___healthy",
    "Pepper,_bell___Bacterial_spot",
    "Pepper,_bell___healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",
    "Raspberry___healthy",
    "Soybean___healthy",
    "Squash___Powdery_mildew",
    "Strawberry___Leaf_scorch",
    "Strawberry___healthy",
    "Tomato___Bacterial_spot",
    "Tomato___Early_blight",
    "Tomato___Late_blight",
    "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot",
    "Tomato___Spider_mites Two-spotted_spider_mite",
    "Tomato___Target_Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    "Tomato___Tomato_mosaic_virus",
    "Tomato___healthy"
]

NUM_CLASSES = len(CLASS_NAMES)


def create_dataset_from_gcs(data_path, is_training=True):
    """
    Create tf.data.Dataset from images in Cloud Storage
    """
    # List all image files in GCS
    gcs_pattern = f"{data_path}/*/*.jpg"
    
    # Create dataset from file patterns
    list_ds = tf.data.Dataset.list_files(gcs_pattern, shuffle=is_training)
    
    def parse_image(file_path):
        # Read image
        img = tf.io.read_file(file_path)
        img = tf.image.decode_jpeg(img, channels=3)
        img = tf.image.resize(img, IMG_SIZE)
        img = img / 255.0  # Normalize
        
        # Extract label from path (format: gs://bucket/train/ClassName/image.jpg)
        parts = tf.strings.split(file_path, '/')
        class_name = parts[-2]
        
        # Convert class name to index
        label = tf.where(tf.equal(CLASS_NAMES, class_name))[0][0]
        label = tf.one_hot(label, NUM_CLASSES)
        
        return img, label
    
    def augment(image, label):
        """Data augmentation for training"""
        if is_training:
            image = tf.image.random_flip_left_right(image)
            image = tf.image.random_brightness(image, 0.2)
            image = tf.image.random_contrast(image, 0.8, 1.2)
            image = tf.image.random_saturation(image, 0.8, 1.2)
            # Random rotation
            k = tf.random.uniform([], 0, 4, dtype=tf.int32)
            image = tf.image.rot90(image, k)
        return image, label
    
    # Parse images and apply augmentation
    dataset = list_ds.map(parse_image, num_parallel_calls=tf.data.AUTOTUNE)
    
    if is_training:
        dataset = dataset.map(augment, num_parallel_calls=tf.data.AUTOTUNE)
        dataset = dataset.shuffle(1000)
    
    dataset = dataset.batch(BATCH_SIZE)
    dataset = dataset.prefetch(tf.data.AUTOTUNE)
    
    return dataset


def create_model():
    """
    Create EfficientNetB4 model with custom classification head
    """
    # Load pre-trained EfficientNetB4
    base_model = EfficientNetB4(
        include_top=False,
        weights='imagenet',
        input_shape=(*IMG_SIZE, 3)
    )
    
    # Freeze base model initially
    base_model.trainable = False
    
    # Build model
    inputs = tf.keras.Input(shape=(*IMG_SIZE, 3))
    x = base_model(inputs, training=False)
    x = layers.GlobalAveragePooling2D()(x)
    x = layers.BatchNormalization()(x)
    x = layers.Dropout(0.3)(x)
    x = layers.Dense(512, activation='relu')(x)
    x = layers.BatchNormalization()(x)
    x = layers.Dropout(0.3)(x)
    outputs = layers.Dense(NUM_CLASSES, activation='softmax')(x)
    
    model = models.Model(inputs, outputs)
    
    return model, base_model


def train_model(args):
    """
    Main training function
    """
    print("=" * 60)
    print("Starting Crop Disease Detection Model Training")
    print("=" * 60)
    print(f"Project: {PROJECT_ID}")
    print(f"Bucket: {BUCKET_NAME}")
    print(f"Model Dir: {MODEL_DIR}")
    print(f"Number of Classes: {NUM_CLASSES}")
    print(f"Image Size: {IMG_SIZE}")
    print(f"Batch Size: {BATCH_SIZE}")
    print(f"Epochs: {args.epochs}")
    print("=" * 60)
    
    # Create datasets
    print("\n📦 Loading datasets from Cloud Storage...")
    train_dataset = create_dataset_from_gcs(TRAIN_DATA_PATH, is_training=True)
    val_dataset = create_dataset_from_gcs(VAL_DATA_PATH, is_training=False)
    print("✅ Datasets loaded successfully")
    
    # Create model
    print("\n🏗️  Building model...")
    model, base_model = create_model()
    
    # Compile model
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=args.learning_rate),
        loss='categorical_crossentropy',
        metrics=[
            'accuracy',
            tf.keras.metrics.TopKCategoricalAccuracy(k=3, name='top_3_accuracy')
        ]
    )
    
    print("✅ Model compiled")
    print(f"\nModel Summary:")
    model.summary()
    
    # Callbacks
    model_callbacks = [
        callbacks.ModelCheckpoint(
            filepath=os.path.join(CHECKPOINT_DIR, 'model_{epoch:02d}_{val_accuracy:.4f}.h5'),
            monitor='val_accuracy',
            save_best_only=True,
            verbose=1
        ),
        callbacks.EarlyStopping(
            monitor='val_loss',
            patience=5,
            restore_best_weights=True,
            verbose=1
        ),
        callbacks.ReduceLROnPlateau(
            monitor='val_loss',
            factor=0.2,
            patience=3,
            min_lr=1e-7,
            verbose=1
        ),
        callbacks.TensorBoard(
            log_dir=os.path.join(MODEL_DIR, 'logs'),
            histogram_freq=1
        ),
        callbacks.CSVLogger(
            os.path.join(MODEL_DIR, 'training_log.csv')
        )
    ]
    
    # Phase 1: Train with frozen base
    print("\n🎓 Phase 1: Training with frozen base model...")
    history1 = model.fit(
        train_dataset,
        epochs=args.epochs // 2,
        validation_data=val_dataset,
        callbacks=model_callbacks,
        verbose=1
    )
    
    # Phase 2: Fine-tune with unfrozen base
    print("\n🎓 Phase 2: Fine-tuning with unfrozen base model...")
    base_model.trainable = True
    
    # Recompile with lower learning rate
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=args.learning_rate / 10),
        loss='categorical_crossentropy',
        metrics=[
            'accuracy',
            tf.keras.metrics.TopKCategoricalAccuracy(k=3, name='top_3_accuracy')
        ]
    )
    
    history2 = model.fit(
        train_dataset,
        epochs=args.epochs // 2,
        validation_data=val_dataset,
        callbacks=model_callbacks,
        verbose=1
    )
    
    # Save final model
    print("\n💾 Saving model...")
    model_path = os.path.join(MODEL_DIR, 'saved_model')
    model.save(model_path)
    print(f"✅ Model saved to {model_path}")
    
    # Save class names
    class_names_path = os.path.join(MODEL_DIR, 'class_names.json')
    with open(class_names_path, 'w') as f:
        json.dump(CLASS_NAMES, f)
    print(f"✅ Class names saved to {class_names_path}")
    
    # Evaluate model
    print("\n📊 Evaluating model...")
    results = model.evaluate(val_dataset, verbose=1)
    print(f"\nFinal Results:")
    print(f"  Loss: {results[0]:.4f}")
    print(f"  Accuracy: {results[1]:.4f}")
    print(f"  Top-3 Accuracy: {results[2]:.4f}")
    
    # Save metrics
    metrics = {
        'loss': float(results[0]),
        'accuracy': float(results[1]),
        'top_3_accuracy': float(results[2])
    }
    metrics_path = os.path.join(MODEL_DIR, 'metrics.json')
    with open(metrics_path, 'w') as f:
        json.dump(metrics, f)
    
    print("\n🎉 Training completed successfully!")
    return model


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--epochs', type=int, default=EPOCHS, help='Number of training epochs')
    parser.add_argument('--batch-size', type=int, default=BATCH_SIZE, help='Batch size')
    parser.add_argument('--learning-rate', type=float, default=LEARNING_RATE, help='Learning rate')
    
    args = parser.parse_args()
    
    # Update global variables
    BATCH_SIZE = args.batch_size
    
    # Train model
    trained_model = train_model(args)
