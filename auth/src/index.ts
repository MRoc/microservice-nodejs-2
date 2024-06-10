import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY not found");
    }
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not found");
    }

    console.log(`Connecting to MongoDb '${process.env.MONGO_URI}'...`);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDb!");

    app.listen(3000, () => {
      console.log("Auth service is listening on port 3000");
    });
  } catch (error) {
    console.error(error);
  }
};

start();
