"""
Download and prepare PlantVillage dataset for training
This script downloads the dataset from Kaggle and uploads to Cloud Storage
"""

import os
import shutil
from google.cloud import storage
import kagglehub

# Configuration
BUCKET_NAME = "kenya-agri-farmwise-ml"
KAGGLE_DATASET = "abdallahalidev/plantvillage-dataset"
GCS_PREFIX = "datasets/plantvillage"

def download_from_kaggle():
    """Download PlantVillage dataset from Kaggle using kagglehub"""
    print("📥 Downloading PlantVillage dataset from Kaggle...")
    print("Using kagglehub for automatic download...")
    
    # Download latest version using kagglehub
    path = kagglehub.dataset_download(KAGGLE_DATASET)
    
    print(f"✅ Dataset downloaded to: {path}")
    return path

def upload_to_gcs(dataset_path):
    """Upload dataset to Google Cloud Storage"""
    print(f"\n☁️  Uploading dataset to gs://{BUCKET_NAME}/{GCS_PREFIX}/...")
    
    # Initialize storage client
    storage_client = storage.Client()
    bucket = storage_client.bucket(BUCKET_NAME)
    
    # Find train and val directories in the downloaded dataset
    # The structure might vary, so we'll search for them
    train_dir = None
    val_dir = None
    
    for root, dirs, files in os.walk(dataset_path):
        if 'train' in dirs and train_dir is None:
            train_dir = os.path.join(root, 'train')
        if 'val' in dirs and val_dir is None:
            val_dir = os.path.join(root, 'val')
        # Also check for 'valid' or 'validation'
        if 'valid' in dirs and val_dir is None:
            val_dir = os.path.join(root, 'valid')
        if 'validation' in dirs and val_dir is None:
            val_dir = os.path.join(root, 'validation')
    
    # Upload train and val directories
    splits = []
    if train_dir:
        splits.append(('train', train_dir))
    if val_dir:
        splits.append(('val', val_dir))
    
    if not splits:
        print("⚠️  Warning: No train/val directories found. Uploading entire dataset...")
        splits = [('all', dataset_path)]
    
    for split_name, split_dir in splits:
        print(f"\n📤 Uploading {split_name} split from {split_dir}...")
        
        file_count = 0
        # Walk through directory
        for root, dirs, files in os.walk(split_dir):
            for file in files:
                if file.endswith(('.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG')):
                    local_path = os.path.join(root, file)
                    
                    # Create GCS path
                    relative_path = os.path.relpath(local_path, split_dir)
                    gcs_path = f"{GCS_PREFIX}/{split_name}/{relative_path}".replace('\\', '/')
                    
                    # Upload file
                    blob = bucket.blob(gcs_path)
                    blob.upload_from_filename(local_path)
                    
                    file_count += 1
                    # Print progress every 100 files
                    if file_count % 100 == 0:
                        print(f"  Uploaded {file_count} files...")
        
        print(f"✅ {split_name} split uploaded ({file_count} files)")
    
    print(f"\n🎉 Dataset uploaded to gs://{BUCKET_NAME}/{GCS_PREFIX}/")

def verify_upload():
    """Verify dataset was uploaded correctly"""
    print("\n🔍 Verifying upload...")
    
    storage_client = storage.Client()
    bucket = storage_client.bucket(BUCKET_NAME)
    
    # Count files in each split
    for split in ['train', 'val']:
        prefix = f"{GCS_PREFIX}/{split}/"
        blobs = list(bucket.list_blobs(prefix=prefix))
        print(f"  {split}: {len(blobs)} files")
    
    print("✅ Verification complete")

def create_dataset_csv():
    """Create CSV file for Vertex AI dataset import"""
    print("\n📝 Creating dataset import CSV...")
    
    storage_client = storage.Client()
    bucket = storage_client.bucket(BUCKET_NAME)
    
    csv_lines = []
    
    # List all training images
    prefix = f"{GCS_PREFIX}/train/"
    blobs = bucket.list_blobs(prefix=prefix)
    
    for blob in blobs:
        if blob.name.endswith(('.jpg', '.jpeg', '.png')):
            # Extract class name from path
            # Format: datasets/plantvillage/train/ClassName/image.jpg
            parts = blob.name.split('/')
            if len(parts) >= 4:
                class_name = parts[-2]
                gcs_uri = f"gs://{BUCKET_NAME}/{blob.name}"
                csv_lines.append(f"{gcs_uri},{class_name}")
    
    # Save CSV
    csv_path = "dataset_import.csv"
    with open(csv_path, 'w') as f:
        f.write('\n'.join(csv_lines))
    
    print(f"✅ CSV created: {csv_path}")
    print(f"   Total images: {len(csv_lines)}")
    
    # Upload CSV to GCS
    blob = bucket.blob(f"{GCS_PREFIX}/dataset_import.csv")
    blob.upload_from_filename(csv_path)
    print(f"✅ CSV uploaded to gs://{BUCKET_NAME}/{GCS_PREFIX}/dataset_import.csv")

def cleanup_local(dataset_path):
    """Clean up local dataset files"""
    print("\n🧹 Cleaning up local files...")
    
    # Note: kagglehub caches downloads, so we don't delete the cache
    # This allows faster re-runs
    print("ℹ️  Note: kagglehub cache is preserved for faster future downloads")
    print(f"   Cache location: {dataset_path}")
    
    if os.path.exists("dataset_import.csv"):
        os.remove("dataset_import.csv")
        print("✅ Removed dataset_import.csv")
    
    print("✅ Cleanup complete")

if __name__ == "__main__":
    print("=" * 60)
    print("PlantVillage Dataset Preparation")
    print("=" * 60)
    
    # Step 1: Download from Kaggle using kagglehub
    dataset_path = download_from_kaggle()
    
    # Step 2: Upload to GCS
    upload_to_gcs(dataset_path)
    
    # Step 3: Verify upload
    verify_upload()
    
    # Step 4: Create dataset CSV
    create_dataset_csv()
    
    # Step 5: Cleanup (optional)
    cleanup_choice = input("\n🗑️  Clean up local files? (y/n): ")
    if cleanup_choice.lower() == 'y':
        cleanup_local(dataset_path)
    else:
        print(f"\nℹ️  Dataset cached at: {dataset_path}")
    
    print("\n" + "=" * 60)
    print("✅ Dataset preparation complete!")
    print("=" * 60)
    print("\nNext steps:")
    print("1. Verify dataset in Cloud Storage:")
    print(f"   gsutil ls gs://{BUCKET_NAME}/{GCS_PREFIX}/")
    print("\n2. Start training:")
    print("   gcloud ai custom-jobs create --config=ml/training_config.yaml")
