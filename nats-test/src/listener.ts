import nats, { Message, Stan } from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListener } from "./ticket-created-listener";
import { natsWrapper } from "./nats-wrapper";

console.clear();

const run = async () => {
  const id = randomBytes(4).toString("hex");
  console.log(`Listener ${id} starting...`);

  await natsWrapper.connect("ticketing", id, "http://localhost:4222");

  console.log(`Listener connected to NATS`);

  const client = natsWrapper.client();

  client.on("close", () => {
    console.log(`NATS connection closed`);
    process.exit();
  });

  process.on("SIGINT", () => client.close());
  process.on("SIGTERM", () => client.close());

  new TicketCreatedListener(client).listen();
};

run();
