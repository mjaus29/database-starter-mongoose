import mongoose from "mongoose";

async function dbConnect() {
  if (mongoose.connection.readyState === 0) {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("Please define the MONGODB_URI environment variable.");
    }

    try {
      await mongoose.connect(mongoURI);
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error;
    }
  }

  return mongoose.connection;
}

export default dbConnect;
