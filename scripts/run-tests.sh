#!/bin/bash

# Get the script's directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( dirname "$DIR" )"

echo "🖼️ Running tests in Puppeteer container..."

# Run the Node.js test runner inside the Puppeteer image
docker run --rm \
  -e NODE_PATH=/home/pptruser/node_modules \
  -v "$PROJECT_ROOT":/app \
  -w /app \
  ghcr.io/puppeteer/puppeteer:latest \
  node scripts/run-tests.js
