import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "@mroc/ex-ms-common";
import { OrderCancelledListener } from "./events/listeners/order-cancelled-listener";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY not found");
    }
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not found");
    }
    if (!process.env.NATS_URI) {
      throw new Error("NATS_URI not found");
    }
    if (!process.env.NATS_CLUSTER_ID) {
      throw new Error("NATS_CLUSTER_ID not found");
    }
    if (!process.env.NATS_CLIENT_ID) {
      throw new Error("NATS_CLIENT_ID not found");
    }

    console.log(
      `Connecting to NATS '${process.env.NATS_URI}' cluster '${process.env.NATS_CLUSTER_ID}' with ID '${process.env.NATS_CLIENT_ID}'...`
    );
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URI
    );
    console.log("Connected to NATS!");

    natsWrapper.client().on("close", () => {
      console.log(`NATS connection closed!`);
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client().close());
    process.on("SIGTERM", () => natsWrapper.client().close());

    new OrderCreatedListener(natsWrapper.client()).listen();
    new OrderCancelledListener(natsWrapper.client()).listen();

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
