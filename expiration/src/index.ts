import { natsWrapper } from "@mroc/ex-ms-common";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";

const start = async () => {
  try {
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

    console.log("Expiration service is starting...");
    new OrderCreatedListener(natsWrapper.client()).listen();
  } catch (error) {
    console.error(error);
  }
};

start();
