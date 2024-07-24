#!/bin/bash

echo "Pulling latest changes from Git repository..."
git pull

echo "Building frontend..."
cd frontend
npm install
npm run build
echo "Copying build contents to static directory..."
cp -r build/* ../

echo "Copying static contents to static directory..."
cd ..
mv manifest.json /staticfiles
mv favicon.ico /staticfiles
mv logo* /staticfiles
mv asset-manifest.json /staticfiles

echo "Running collectstatic..."
python manage.py collectstatic --noinput

echo "Deployment complete"
