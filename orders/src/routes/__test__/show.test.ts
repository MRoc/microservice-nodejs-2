import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it("return 401 if user is not signed in", async () => {
  const orderId = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/orders/${orderId}`).send().expect(401);
});

it("returns 404 if orderId is invalid", async () => {
  const orderId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get(`/api/orders/${orderId}`)
    .set("Cookie", signin())
    .send()
    .expect(404);
});

it("fetches the order", async () => {
  const ticket = await Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "Title",
    price: 20,
  });
  await ticket.save();

  const user = signin();

  const { body: order1 } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  const { body: order2 } = await request(app)
    .get(`/api/orders/${order1.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(order2.id).toBe(order1.id);
});

it("returns 401 if other users order", async () => {
  const ticket = await Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "Title",
    price: 20,
  });
  await ticket.save();

  const user1 = signin();
  const user2 = signin();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user1)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", user2)
    .send()
    .expect(401);
});
