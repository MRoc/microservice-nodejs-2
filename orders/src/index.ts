import { app } from "./app";
import {
  natsWrapper,
  throwIfMissingNatsConfig,
  throwIfMissingMongoConfig,
  connectMongo,
  connectNsts,
} from "@mroc/ex-ms-common";
import { TicketCreatedListener } from "./events/listeners/ticket-created-listener";
import { TicketUpdatedListener } from "./events/listeners/ticket-updated-listener";
import { ExpirationCompleteListener } from "./events/listeners/expiration-complete-listener";
import { PaymentCreatedListener } from "./events/listeners/payment-created-listener";

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY not found");
    }

    throwIfMissingNatsConfig();
    throwIfMissingMongoConfig();

    connectNsts();
    new TicketCreatedListener(natsWrapper.client()).listen();
    new TicketUpdatedListener(natsWrapper.client()).listen();
    new ExpirationCompleteListener(natsWrapper.client()).listen();
    new PaymentCreatedListener(natsWrapper.client()).listen();

    connectMongo();

    app.listen(3000, () => {
      console.log("Orders service is listening on port 3000");
    });
  } catch (error) {
    console.error(error);
  }
};

start();
