const mongoose = require('mongoose');

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error('Database connection failed: MONGO_URI environment variable is missing on Vercel.');
  }

  try {
    cachedConnection = mongoose.connect(mongoUri);
    const conn = await cachedConnection;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    cachedConnection = null; // Reset cache on failure
    if (!process.env.VERCEL) {
      process.exit(1); // Exit process with failure only locally
    }
    throw error;
  }
};

module.exports = connectDB;
