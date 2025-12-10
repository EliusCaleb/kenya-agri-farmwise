# Multi-stage Dockerfile for React Frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all source files
COPY . .

# Set build-time environment variables
ENV VITE_DISEASE_PREDICTION_API=https://disease-prediction-api-940340800088.us-central1.run.app/predict
ENV VITE_SUPABASE_URL=https://xpdllghezvpnedfbunxo.supabase.co
ENV VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwZGxsZ2hlenZwbmVkZmJ1bnhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4OTYzMDEsImV4cCI6MjA4MDQ3MjMwMX0.vv3JfIlJc7jl2qRNncodZPyFnikbQuACsrZsHHSpbjY
ENV VITE_SUPABASE_PROJECT_ID=xpdllghezvpnedfbunxo

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 8080 (Cloud Run requirement)
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
