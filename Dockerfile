# Dockerfile for Streamlit Admin Dashboard (Monorepo Root)
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY admin-dashboard/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code from admin-dashboard
COPY admin-dashboard/ ./admin-dashboard/

# Set working directory to admin-dashboard for the app
WORKDIR /app/admin-dashboard

# Expose port (Render will set PORT env var)
EXPOSE 8501

# Health check (simple port check)
# Note: Health check will use default port 8501, Render handles port mapping
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD python -c "import socket; s = socket.socket(); s.connect(('localhost', 8501)); s.close()" || exit 1

# Run Streamlit
CMD streamlit run app.py --server.port=$PORT --server.address=0.0.0.0 --server.headless=true

