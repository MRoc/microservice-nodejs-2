import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "@mroc/ex-ms-common";

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY not found");
    }
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not found");
    }

    console.log(`Connecting to NATS...`);
    await natsWrapper.connect(
      "ticketing",
      "ticket-service",
      "http://nats-srv:4222"
    );
    console.log("Connected to NATS!");

    natsWrapper.client().on("close", () => {
      console.log(`NATS connection closed!`);
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client().close());
    process.on("SIGTERM", () => natsWrapper.client().close());

    console.log(`Connecting to MongoDb '${process.env.MONGO_URI}'...`);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDb!");

    app.listen(3000, () => {
      console.log("Tickets service is listening on port 3000");
    });
  } catch (error) {
    console.error(error);
  }
};

start();
