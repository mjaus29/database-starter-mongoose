import mongoose from "mongoose";

let isConnected = false;

async function dbConnect() {
  if (isConnected) {
    console.log("Using existing database connection");
    return mongoose.connection;
  }

  const mongoURI = process.env.MONGODB_URI;
  if (!mongoURI) {
    throw new Error("Please define the MONGODB_URI environment variable.");
  }

  try {
    await mongoose.connect(mongoURI);
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }

  return mongoose.connection;
}

export default dbConnect;
