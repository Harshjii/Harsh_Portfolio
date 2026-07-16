const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");
const metricsRoutes = require("./routes/metricRoutes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection middleware for Serverless compatibility
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running!" });
});

// API Routes
app.use("/api/contact", contactRoutes);
app.use("/api/metrics", metricsRoutes);

// Global Error Handler Middleware
app.use(errorHandler);

// Export app for serverless environments (Vercel)
module.exports = app;

// Listen on Port only when running locally (not on Vercel)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
  });
}
