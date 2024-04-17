// utils/db.js

import mongoose from "mongoose";

let isConnected;

const connectToDatabase = async () => {
  // Check if we are already connected, if so, return the existing connection
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  // If not already connected, establish a new connection
  try {
    const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState;
    console.log("MongoDB connection successfully established");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Error connecting to MongoDB");
  }
};

export { connectToDatabase };
