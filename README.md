# Harsh Gupta - Developer Portfolio

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-black?style=flat-square&logo=vercel)](https://harsh-portfolio-omega-five.vercel.app/)
[![Angular](https://img.shields.io/badge/Angular-v21-dd0031?style=flat-square&logo=angular)](https://angular.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=nodedotjs)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)

A premium, dynamic developer portfolio website showcasing projects, skills, and metrics, built using the MEAN stack and hosted on Vercel.

---

## 🚀 Live Demo

- **Frontend**: [harsh-portfolio-omega-five.vercel.app](https://harsh-portfolio-omega-five.vercel.app/)
- **Backend API**: [harsh-portfolio-sja2.vercel.app](https://harsh-portfolio-sja2.vercel.app/api/health)

---

## 🛠️ Tech Stack

- **Frontend**: Angular 21 (with RxJS, Component-driven Architecture, Custom CSS)
- **Backend**: Node.js & Express (configured as serverless Vercel Functions)
- **Database**: MongoDB Atlas (NoSQL database for contact messages and metrics)
- **Hosting**: Vercel (Front-end and Back-end)

---

## 📂 Project Structure

```text
├── backend/                  # Node.js/Express Backend Server
│   ├── config/               # Database Connection configuration (with Serverless caching)
│   ├── controllers/          # Request handler functions
│   ├── middleware/           # Custom error handler & serverless db middleware
│   ├── models/               # Mongoose schemas (Contact, Metric)
│   ├── routes/               # API endpoint routes (/api/contact, /api/metrics)
│   ├── server.js             # Main server entrypoint (Vercel-compatible)
│   └── vercel.json           # Vercel deployment configuration for Node.js
│
├── frontend/                 # Angular 21 Frontend Application
│   ├── src/                  # Angular source code (components, services, styles)
│   ├── angular.json          # Angular CLI configuration
│   ├── vercel.json           # Vercel deployment configuration for Angular
│   └── package.json          # Frontend dependencies and scripts
│
├── js/                       # Vanilla JavaScript fallback scripts
├── index.html                # Static HTML entryway
├── style.css                 # Main portfolio stylesheet
└── README.md                 # This file
```

---

## ✨ Features

- **Responsive Design**: Elegant dark-themed and glassmorphic layout optimized for mobile, tablet, and desktop views.
- **Dynamic Contact Form**: Visitors can send messages which are directly saved to MongoDB Atlas database via the Express API.
- **Project Tracking Metrics**: Automatically increments and logs click counts for featured projects to track interest.
- **Serverless Backend**: Express backend deployed as high-performance Serverless Functions on Vercel.

---

## 💻 Local Setup

### Prerequisites
- Node.js installed (v18+)
- MongoDB Atlas cluster URL

### 1. Setup Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   NODE_ENV=development
   ```
4. Start the development server (runs on `http://localhost:5000`):
   ```bash
   npm run dev
   ```

### 2. Setup Frontend
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the local development server (runs on `http://localhost:4200`):
   ```bash
   npm run start
   ```

---

## ☁️ Vercel Deployment

Both components are deployed on Vercel under separate projects:

### Backend (Serverless Express)
1. Import the repository in Vercel.
2. Set the **Root Directory** to `backend`.
3. Add the **Environment Variable** `MONGO_URI` under Project Settings.
4. Whitelist all IP addresses (`0.0.0.0/0`) in your **MongoDB Atlas Network Access** settings so Vercel's dynamic serverless functions can connect.

### Frontend (Angular App)
1. Import the repository in Vercel.
2. Set the **Root Directory** to `frontend`.
3. Ensure the production backend URL is updated in `frontend/src/app/services/storage.service.ts` so API requests hit the live Vercel backend.
