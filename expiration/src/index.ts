import { app } from "./app";
import { natsWrapper } from "@mroc/ex-ms-common";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { throwIfMissingNatsConfig, connectNsts } from "@mroc/ex-ms-common";

const start = async () => {
  try {
    throwIfMissingNatsConfig();
    await connectNsts();

    console.log("Expiration service is starting...");
    new OrderCreatedListener(natsWrapper.client()).listen();

    app.listen(3000, () => {
      console.log("Expiration service is listening on port 3000");
    });
  } catch (error) {
    console.error(error);
  }
};

start();
