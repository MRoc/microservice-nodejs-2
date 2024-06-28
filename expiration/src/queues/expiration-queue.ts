import { Queue, Worker } from "bullmq";
import { ExpirationCompletePublisher } from "../events/publishers/expiration-complete-publisher";
import { natsWrapper } from "@mroc/ex-ms-common/build";
export interface Payload {
  orderId: string;
}

const queueName = "order:expiration";

const options = {
  connection: {
    host: "expiration-redis-srv",
    port: 6379,
  },
};

const expirationQueue = new Queue<Payload>(queueName, options);

const worker = new Worker<Payload>(
  queueName,
  async (job) => {
    new ExpirationCompletePublisher(natsWrapper.client()).publish({
      orderId: job.data.orderId,
    });
  },
  options
);

export { expirationQueue, worker };
