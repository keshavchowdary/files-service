const mongoose = require('mongoose');

async function connectToDB() {
  try {
    const dbURI = process.env.MONGODB_URI;
    if (!dbURI) {
        throw new Error('MONGODB_URI not found in environment variables');
    }
    await mongoose.connect(dbURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
}

module.exports = { connectToDB };
