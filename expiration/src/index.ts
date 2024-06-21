import { natsWrapper } from "@mroc/ex-ms-common";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import {
  throwIfMissingMongoConfig,
  throwIfMissingNatsConfig,
  connectNsts,
} from "@mroc/ex-ms-common";

const start = async () => {
  try {
    throwIfMissingMongoConfig();
    throwIfMissingNatsConfig();

    connectNsts();

    console.log("Expiration service is starting...");
    new OrderCreatedListener(natsWrapper.client()).listen();
  } catch (error) {
    console.error(error);
  }
};

start();
