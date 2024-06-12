import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

const id = randomBytes(4).toString("hex");

console.log(`Listener ${id} starting...`);

const stan = nats.connect("ticketing", id, {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log(`Listener ${id} connected to NATS`);

  const options = stan.subscriptionOptions().setManualAckMode(true);

  const subject = "ticket:created";
  const queueGroup = "listenerQueueGroup";
  const subscription = stan.subscribe(subject, queueGroup, options);

  subscription.on("message", (msg: Message) => {
    const data = msg.getData();

    if (typeof data === "string") {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }

    msg.ack();
  });
});
