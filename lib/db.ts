import mongoose from "mongoose";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!process.env.MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable.");
  }

  cached.promise =
    cached.promise ||
    mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    });

  cached.conn = await cached.promise;
  console.log("MongoDB connected successfully");

  return cached.conn;
}

global.mongoose = cached;
export default dbConnect;
