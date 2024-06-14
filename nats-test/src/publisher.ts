import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./ticket-created-publisher";
import { natsWrapper } from "./nats-wrapper";

console.clear();

console.log(`Publisher starting...`);

const run = async () => {
  await natsWrapper.connect("ticketing", "abc", "http://localhost:4222");

  console.log(`Publisher connected to NATS`);

  const publisher = new TicketCreatedPublisher(natsWrapper.client());

  try {
    await publisher.publish({
      id: "123",
      title: "concert",
      price: 20,
    });
  } catch (err) {
    console.error(err);
  }
};

run();
