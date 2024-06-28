import { app } from "./app";
import {
  natsWrapper,
  throwIfMissingNatsConfig,
  throwIfMissingMongoConfig,
  connectMongo,
  connectNsts,
} from "@mroc/ex-ms-common";
import { OrderCancelledListener } from "./events/listeners/order-cancelled-listener";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY not found");
    }
    throwIfMissingNatsConfig();
    throwIfMissingMongoConfig();

    await connectNsts();

    new OrderCreatedListener(natsWrapper.client()).listen();
    new OrderCancelledListener(natsWrapper.client()).listen();

    await connectMongo();

    app.listen(3000, () => {
      console.log("Payments service is listening on port 3000");
    });
  } catch (error) {
    console.error(error);
  }
};

start();
