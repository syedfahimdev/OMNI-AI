#!/bin/bash
# Start script for Railway deployment
# This script properly handles the PORT environment variable

# Use PORT from environment, default to 8501 if not set
PORT="${PORT:-8501}"

echo "Starting Streamlit on port $PORT"

# Run Streamlit with the port from environment
exec streamlit run app.py \
  --server.port="$PORT" \
  --server.address=0.0.0.0 \
  --server.headless=true

