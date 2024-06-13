import nats, { Message, Stan } from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

const id = randomBytes(4).toString("hex");

console.log(`Listener ${id} starting...`);

const stan = nats.connect("ticketing", id, {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log(`Listener ${id} connected to NATS`);

  stan.on("close", () => {
    console.log(`NATS connection closed`);
    process.exit();
  });

  const options = stan
    .subscriptionOptions()
    // Requires messages to be acknowledged
    .setManualAckMode(true)
    // Re-deliver unprocessed messages
    .setDeliverAllAvailable()
    // Makes all events only come once
    .setDurableName("listener-service");

  const subject = "ticket:created";

  // Use queue group to ensure only one instance of the listener
  // processes the event and that the durableName history does
  // not get wiped.
  const queueGroup = "listener-queue-group";
  const subscription = stan.subscribe(subject, queueGroup, options);

  subscription.on("message", (msg: Message) => {
    const data = msg.getData();

    if (typeof data === "string") {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }

    msg.ack();
  });
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());

abstract class Listener {
  abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessage(data: any, msg: Message): void;
  private client: Stan;
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subsciption = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subsciption.on("message", (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

      const data = this.parseMessage(msg);
      this.onMessage(data, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}

class TicketCreatedListener extends Listener {
  subject = "ticket:created";
  queueGroupName = "payments-service";

  constructor(client: Stan) {
    super(client);
  }

  onMessage(data: any, msg: nats.Message) {
    console.log("Event data!", data);
    msg.ack();
  }
}
