# 🤖 AI Chatbot Platform

![AI Chatbot](https://img.shields.io/badge/AI-Chatbot-blue)
![Django](https://img.shields.io/badge/Backend-Django-green)
![React](https://img.shields.io/badge/Frontend-React-blue)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)
![Together AI](https://img.shields.io/badge/API-Together_AI-purple)

A full-stack web application featuring a powerful AI chatbot powered by Together AI, with user authentication and a responsive interface built with React and Django.

![sign-in](https://github.com/user-attachments/assets/4d7527ef-c722-4445-af31-7964f24a9fdb)

![sign-up](https://github.com/user-attachments/assets/e960f7eb-d18a-4594-b177-4cda3bf5e964)

![chatbot](https://github.com/user-attachments/assets/c3b6bbd5-dc28-4d07-a971-ece3f05355df)

## Features

- **User Authentication System**
  - Secure signup and login functionality
  - JWT token-based authentication
  - Password strength validation

- **AI Chatbot**
  - Real-time conversation with AI assistant
  - Powered by Together AI
  - Clean, intuitive chat interface

- **Responsive Design**
  - Works across desktop and mobile devices
  - Modern React-based UI
  - Smooth user experience

## Tech Stack

### Backend
- **Django 5.1.6**: High-level Python web framework
- **Django REST Framework 3.15.2**: Powerful toolkit for building Web APIs
- **djangorestframework-simplejwt 5.4.0**: JWT authentication for Django REST Framework
- **together 1.5.5**: Official Together AI Python client
- **PostgreSQL**: Advanced open-source database system

### Frontend
- **React**: JavaScript library for building user interfaces
- **HTML5/CSS3**: Modern web layout and styling
- **JavaScript (ES6+)**: Dynamic client-side functionality
- **Fetch API**: For making API calls to the backend
- **Node.js/npm**: Package management and development server

## Project Structure

### Backend
```
backend/
├── backend/           # Main Django project settings
├── users/             # User authentication app
│   ├── models.py
│   ├── serializers.py
│   ├── urls.py
│   └── views.py
└── chatbot/           # Chatbot functionality app
    ├── models.py
    ├── serializers.py
    ├── urls.py
    └── views.py
```

### Frontend
```
frontend/
├── public/            # Static files
├── src/               # React source files
│   ├── components/    # React components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── styles/        # CSS styles
│   ├── App.js         # Main React component
│   └── index.js       # React entry point
├── package.json       # NPM dependencies and scripts
└── node_modules/      # Node.js packages
```

## Installation

### Prerequisites
- Python 3.10+
- Node.js and npm
- PostgreSQL database
- Together AI API key

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/mel-moun/Chatbot.git
   cd Chatbot
   ```

2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up PostgreSQL database:
   ```bash
   # Install PostgreSQL if not already installed
   # On Ubuntu/Debian:
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   
   # On macOS with Homebrew:
   brew install postgresql
   
   # Start PostgreSQL service
   # On Ubuntu/Debian:
   sudo service postgresql start
   
   # On macOS:
   brew services start postgresql
   ```

5. Create PostgreSQL database and user:
   ```bash
    -- Create database and user
    CREATE DATABASE test_db;
    CREATE USER test_user WITH PASSWORD 'test_password';
    
    -- Recommended user settings
    ALTER ROLE test_user SET client_encoding TO 'utf8';
    ALTER ROLE test_user SET default_transaction_isolation TO 'read committed';
    ALTER ROLE test_user SET timezone TO 'UTC';
    
    -- Grant privileges
    GRANT ALL PRIVILEGES ON DATABASE test_db TO test_user;
    
    -- Connect to the database
    \c test_db
    
    -- Grant schema and object-level privileges
    ALTER SCHEMA public OWNER TO test_user;
    GRANT ALL ON SCHEMA public TO test_user;
    GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO test_user;
    GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO test_user;
    GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO test_user;
    
    -- Optional extensions
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE EXTENSION IF NOT EXISTS pg_trgm;
    
    -- Set search path
    ALTER ROLE test_user SET search_path TO public;
    
    -- Exit PostgreSQL
     \q
   ```
  
6. Configure environment variables:
    1. Go to `Together.ai` and sign up.
    2. Get your API key from the dashboard.
    3. Create a `.env` file in the Backend directory with the following content:
    ```
    SECRET_KEY=django-insecure-dummyt3stingk3y
    DEBUG=True
    TOGETHER_API_KEY=your-together-api-key-here
    DB_ENGINE=django.db.backends.postgresql
    DB_NAME=test_db
    DB_USER=test_user
    DB_PASSWORD=test_password
    DB_HOST=localhost
    DB_PORT=5432
    ```
    💡 You can use a dummy key like `test-dummy-key-1234` to run the project locally without chatbot functionality.
      However, to use the AI features, you need a valid API key from Together.ai.

8. Run migrations:
   ```bash
   cd Backend
   # Make migrations in correct order
   python3 manage.py makemigrations users
   python3 manage.py makemigrations  # For other apps
    
   # Apply all migrations
   python3 manage.py migrate

   ```

9. Start the Django development server:
   ```bash
   python3 manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The application should automatically open in your default browser or navigate to the URL shown in your terminal (typically http://localhost:5173/)

## API Endpoints

### Authentication
- **POST** `/api/users/register/`: Register a new user
- **POST** `/api/users/login/`: Login and obtain JWT tokens

### Chatbot
- **POST** `/api/chat/`: Send a message to the AI chatbot

## Security Features

- JWT token-based authentication
- Password strength validation
- Form input validation
- CORS protection
- Protection against common web vulnerabilities
