#!/bin/sh
# Start script for Railway/Render deployments
# This script ensures next is found even if PATH is not set correctly

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
NEXT_BIN="$SCRIPT_DIR/node_modules/.bin/next"

# Check if next binary exists
if [ ! -f "$NEXT_BIN" ]; then
  echo "Error: next binary not found at $NEXT_BIN"
  echo "Current directory: $(pwd)"
  echo "Listing node_modules/.bin:"
  ls -la node_modules/.bin/ 2>/dev/null || echo "node_modules/.bin does not exist"
  exit 1
fi

# Use PORT from environment, default to 3000
PORT="${PORT:-3000}"

echo "Starting Next.js on port $PORT"
echo "Using next binary at: $NEXT_BIN"

# Start Next.js
exec "$NEXT_BIN" start -p "$PORT" -H "0.0.0.0"

