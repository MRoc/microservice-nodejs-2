import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT not found");
    }

    await mongoose.connect("mongodb://tickets-mongo-srv:27017/tickets");
    console.log("Connected to MongoDb");

    app.listen(3000, () => {
      console.log("Tickets service is listening on port 3000");
    });
  } catch (error) {
    console.error(error);
  }
};

start();
