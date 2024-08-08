# Signal in the Haystack Personal Blog

My own personal blog web application! With a Python backend and a React frontend (using CRA), the web app is deployed on a cloud-hosted VM. You can access the site at [signalinthehaystack.xyz](https://signalinthehaystack.xyz).

## Features
- **Blog Post displays**: The home page displays a list of blog posts and relevant metadata (title, date, image, description). Clicking on one takes the user to the full blog post.
- **Commenting**: Users can add comments at the bottom of individual blog posts. Rate limiting and profanity scrubbing applied.
- **Navigation Bar**: Users can navigate across the website (and to external sites) using the navigation bar at the top.
- **Email Subscription**: Coming soon.

## Technologies Used
- **Backend**: Django, Django Rest Framework, Python
- **Frontend**: React, JavaScript
- **Database**: SQLite
- **Server**: Nginx (front-end proxy), Gunicorn (backend server)

## Setup and Installation

### Prerequisites
- Python 3.x
- Node.js and npm
- Nginx
- Gunicorn
- Let's Encrypt (for SSL)

### Installation

1. **Clone the Repository**
    ```bash
    git clone https://github.com/zakhij/blog.git
    cd blog
    ```

2. **Install Requirements**
    ```bash
    pip install -r requirements.txt
    ```

3. **Apply Migrations and Create Admin User**
    ```bash
    python manage.py migrate
    python manage.py createsuperuser
    ```

4. **Configure .env Files**

    `.env`:
    ```ini
    DEBUG=False
    SECRET_KEY=django-XXX
    ALLOWED_HOSTS=signalinthehaystack.xyz
    CORS_ORIGIN_WHITELIST=https://signalinthehaystack.xyz
    ```

    `frontend/.env`:
    ```ini
    REACT_APP_BACKEND_URL=https://signalinthehaystack.xyz
    ```
    Adjust the fields as needed (e.g., for local development, use `http://localhost:3000`).

5. **Set up/Build Frontend using Deploy Script**
    ```bash
    ./deploy.sh
    ```

6. **Run the Backend/Frontend Servers (Development)**
    ```bash
    python manage.py runserver 0.0.0.0:8000
    cd frontend
    npm start
    ```

7. **Run the Backend Server (Production)**
    ```bash
    gunicorn --workers 3 backend.wsgi:application --bind 0.0.0.0:8000
    ```

    Assuming you have Nginx proxy server set up for the frontend! For example:

    ```nginx
    server {
        listen 80;
        server_name signalinthehaystack.xyz www.signalinthehaystack.xyz;

        # Redirect all HTTP requests to HTTPS
        return 301 https://$host$request_uri;
    }

    server {
        listen 443 ssl;
        server_name signalinthehaystack.xyz www.signalinthehaystack.xyz;

        # SSL Configuration
        ssl_certificate /etc/letsencrypt/live/signalinthehaystack.xyz/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/signalinthehaystack.xyz/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_prefer_server_ciphers on;

        # Serve frontend static files
        location / {
            root /path/to/your/project/root/blog/frontend/build;
            try_files $uri /index.html;
        }

        # Proxy API requests to the backend server
        location /api/ {
            proxy_pass http://localhost:8000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location /admin/ {
            proxy_pass http://localhost:8000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
    ```







