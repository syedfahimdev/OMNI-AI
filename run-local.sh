#!/bin/bash

# Local Development Runner Script
# This script helps you run both applications locally

echo "🚀 OMNI AI Local Development Setup"
echo "===================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.11+"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""

# Function to setup admin dashboard
setup_admin_dashboard() {
    echo "📦 Setting up Admin Dashboard..."
    cd admin-dashboard
    
    if [ ! -d ".venv" ]; then
        echo "Creating virtual environment..."
        python3.11 -m venv .venv
    fi
    
    echo "Activating virtual environment..."
    source .venv/bin/activate
    
    echo "Installing dependencies..."
    pip install -r requirements.txt -q
    
    if [ ! -f ".env.local" ]; then
        if [ -f ".env.example" ]; then
            echo "Creating .env.local from .env.example..."
            cp .env.example .env.local
            echo "⚠️  Please edit admin-dashboard/.env.local with your credentials"
        else
            echo "⚠️  .env.example not found. Please create .env.local manually"
        fi
    fi
    
    cd ..
    echo "✅ Admin Dashboard setup complete"
    echo ""
}

# Function to setup website
setup_website() {
    echo "📦 Setting up Website..."
    cd website
    
    if [ ! -d "node_modules" ]; then
        echo "Installing dependencies..."
        npm install
    fi
    
    if [ ! -f ".env.local" ]; then
        if [ -f ".env.example" ]; then
            echo "Creating .env.local from .env.example..."
            cp .env.example .env.local
            echo "⚠️  Please edit website/.env.local with your credentials"
        else
            echo "⚠️  .env.example not found. Please create .env.local manually"
        fi
    fi
    
    cd ..
    echo "✅ Website setup complete"
    echo ""
}

# Main menu
echo "What would you like to do?"
echo "1) Setup both applications"
echo "2) Setup Admin Dashboard only"
echo "3) Setup Website only"
echo "4) Run Admin Dashboard"
echo "5) Run Website"
echo "6) Run both (in background)"
echo ""
read -p "Enter choice [1-6]: " choice

case $choice in
    1)
        setup_admin_dashboard
        setup_website
        echo "✅ Setup complete! Edit .env.local files and then run the applications."
        ;;
    2)
        setup_admin_dashboard
        ;;
    3)
        setup_website
        ;;
    4)
        cd admin-dashboard
        source .venv/bin/activate
        echo "🚀 Starting Admin Dashboard on http://localhost:8501"
        streamlit run app.py
        ;;
    5)
        cd website
        echo "🚀 Starting Website on http://localhost:3000"
        npm run dev
        ;;
    6)
        echo "🚀 Starting both applications..."
        cd admin-dashboard
        source .venv/bin/activate
        streamlit run app.py &
        ADMIN_PID=$!
        cd ../website
        npm run dev &
        WEBSITE_PID=$!
        echo "✅ Admin Dashboard running (PID: $ADMIN_PID) on http://localhost:8501"
        echo "✅ Website running (PID: $WEBSITE_PID) on http://localhost:3000"
        echo "Press Ctrl+C to stop both"
        wait
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac
