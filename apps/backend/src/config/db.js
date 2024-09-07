// db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DATABASE_URL = process.env.DATABASE;

console.log(DATABASE_URL);


export default async function connectToDatabase() {
  try {
    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // Suppress the deprecation warning for strictQuery
    mongoose.set("strictQuery", false);

    console.log("\n--Connected to the MongoDB Atlas database--");
    return mongoose.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error.message);
    throw error;
  }
}

