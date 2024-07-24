#!/bin/bash

echo "Pulling latest changes from Git repository..."
git pull

# Navigate to frontend directory and build the project
echo "Building frontend..."
cd frontend
npm install
npm run build
echo "Copying build contents to static directory..."
cp -r build/* ../

echo "Running collectstatic..."
cd ..
python manage.py collectstatic --noinput

echo "Deployment complete"
