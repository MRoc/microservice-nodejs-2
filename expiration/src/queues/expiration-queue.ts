import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";

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
    console.log(`TODO expiration:complete event for ${job.data.orderId}`);
  },
  options
);

export { expirationQueue };
