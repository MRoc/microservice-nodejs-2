import { natsWrapper } from "@mroc/ex-ms-common";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { throwIfMissingNatsConfig, connectNsts } from "@mroc/ex-ms-common";

const start = async () => {
  try {
    throwIfMissingNatsConfig();
    connectNsts();

    console.log("Expiration service is starting...");
    new OrderCreatedListener(natsWrapper.client()).listen();
  } catch (error) {
    console.error(error);
  }
};

start();
