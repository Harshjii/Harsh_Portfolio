const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");
const metricsRoutes = require("./routes/metricRoutes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB();

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

// Listen on Port
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
