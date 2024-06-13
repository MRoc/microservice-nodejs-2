import nats, { Message, Stan } from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListener } from "./ticket-created-listener";

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

  new TicketCreatedListener(stan).listen();
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
