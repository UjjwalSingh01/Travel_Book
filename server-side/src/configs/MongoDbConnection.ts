import mongoose from "mongoose";

const MONGO_DB_URI = process.env.MONGO_DB_URI || "your-mongodb-atlas-connection-string";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("Already connected to MongoDB Atlas");
      return;
    }

    await mongoose.connect(MONGO_DB_URI, {
      dbName: "travel_book",
    });

    console.log("MongoDB Atlas connected successfully ✅");
  } catch (error) {
    console.error("MongoDB connection error ❌", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
