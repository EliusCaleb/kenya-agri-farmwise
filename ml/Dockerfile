# Dockerfile for Vertex AI Custom Training
# This container is used to train the crop disease detection model

FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy training script and utilities
COPY train_model.py .
COPY utils/ ./utils/

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV AIP_MODEL_DIR=/tmp/model
ENV AIP_CHECKPOINT_DIR=/tmp/checkpoints

# Create directories for model artifacts
RUN mkdir -p /tmp/model /tmp/checkpoints /tmp/data

# The training script will be executed by Vertex AI
ENTRYPOINT ["python", "train_model.py"]
