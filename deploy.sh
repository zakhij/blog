#!/bin/bash

echo "Pulling latest changes from Git repository..."
git pull

echo "Building frontend..."
cd frontend
npm install
npm run build

echo "Migrating database..."
cd ../
python manage.py migrate

echo "Static files..."
python manage.py collectstatic --noinput

echo "Deployment complete"
