const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'MEAN backend is running!' });
});

// Future API Endpoints:
// app.post('/api/contact', (req, res) => { ... });
// app.post('/api/metrics/clicks', (req, res) => { ... });

// Mongoose Connection placeholder (will connect when MONGO_URI is set in .env)
const mongoUri = process.env.MONGO_URI;
if (mongoUri) {
  mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB Database'))
    .catch((err) => console.error('MongoDB connection error:', err));
} else {
  console.log('Skipping MongoDB connection: MONGO_URI not set in environment.');
}

// Server listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
