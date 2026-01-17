# Folder1
# 🚀 GraphQL Server with Apollo and Express

A simple GraphQL server built using **Apollo Server**, **Express 5**, and **Axios**.  
This project fetches data from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) and exposes it via GraphQL queries.

---

## 📂 Features
- Express 5 integration with Apollo Server  
- Fetch external REST data using Axios  
- Nested GraphQL resolvers (e.g. Todos → User)  
- CORS + Body Parser middleware setup  

---

## ⚙️ Installation & Setup

```bash
# clone the repo
git clone https://github.com/kv13b/pract_lang.git

# go to server folder
cd pract_lang/server

# install dependencies
npm install

# Run the server
node index.js

http://localhost:8000/graphql
```

# Folder 2
🚀 User Service – Serverless Backend

A serverless User Service backend built using Node.js, AWS Lambda, and the Serverless Framework.
It handles authentication, phone verification, user profile management, cart, and payment-related APIs.
The project supports scalable cloud deployment with Docker-based local development.

📂 Features

Serverless architecture using AWS Lambda
JWT-based authentication
Twilio SMS verification (trial account)
Dockerized database for local development
Serverless Offline for local API testing
⚙️ Installation & Setup Guide
Follow these steps when setting up the project on a new system.

1️⃣ Prerequisites
Ensure the following are installed:
Node.js (v20.x)
npm
Docker & Docker Compose
Git
Serverless Framework

2️⃣ Clone the Repository
git clone https://github.com/kv13b/pract_lang.git
cd kbay/server/user-service

3️⃣ Install Dependencies
npm install

4️⃣ Install Serverless Framework (Global)
npm install -g serverless

5️⃣ Environment Configuration
Create a .env file for local development:

TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
⚠️ Do not commit .env to GitHub

6️⃣ Start Database Using Docker
docker-compose up -d


This starts the database container required by the service.
7️⃣ Run the Project Locally (Serverless Offline)
serverless offline

The APIs will now be available locally using the Serverless Offline plugin.

🧪 Development Notes

JWT is used for securing protected routes
Twilio SMS is integrated for phone verification
For local development, SMS sending can be mocked to avoid consuming Twilio credits
Docker ensures a consistent database setup across systems

📘 Additional Documentation
For a detailed explanation of architecture, flows, and decisions, refer to:
👉 Notion Docs
https://www.notion.so/Kbay-serverless-Project-2eb7b87df2ac8004912ef7fefae48208?source=copy_link

# Folder3
# 🛍️ React + Redux Shopping Cart App

A simple e-commerce frontend built with **React**, **Redux**, and **React Router DOM**.  
This app demonstrates product listing, cart management, and navigation using global state. 
---

## ⚙️ Setup & Run

```bash
# Clone the repo
git clone https://github.com/kv13b/pract_lang.git

# Go to the React app folder
cd pract_lang/<your-folder-name>

# Install dependencies
npm install

# Start the development server
npm run dev

```
