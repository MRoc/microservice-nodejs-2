import nats from "node-nats-streaming";

console.clear();

console.log(`Publisher starting...`);

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log(`Publisher connected to NATS`);

  const json = JSON.stringify({
    id: "123",
    title: "concert",
    price: 20,
  });

  stan.publish("ticket:created", json, (err, guid) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Event published with guid: ${guid}`);
    }
  });
});
