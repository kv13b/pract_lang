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

## 🧩 Tech Stack
- **Node.js**
- **Express 5**
- **Apollo Server**
- **GraphQL**
- **Axios**

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

