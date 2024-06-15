import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { OrderStatus, natsWrapper } from "@mroc/ex-ms-common/build";
import { Order } from "../../models/order";

it("return 401 if user is not signed in", async () => {
  const orderId = new mongoose.Types.ObjectId().toHexString();
  await request(app).delete(`/api/orders/${orderId}`).send().expect(401);
});

it("returns 404 if orderId is invalid", async () => {
  const orderId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .delete(`/api/orders/${orderId}`)
    .set("Cookie", signin())
    .send()
    .expect(404);
});

it("cancels the order", async () => {
  const ticket = await Ticket.build({ title: "Title", price: 20 });
  await ticket.save();

  const user = signin();

  const { body: order1 } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .delete(`/api/orders/${order1.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  const updatedOrder = await Order.findById(order1.id);
  expect(updatedOrder!.status).toBe(OrderStatus.Cancelled);
});

it("emits an order cancelled event", async () => {
  const ticket = await Ticket.build({ title: "Title", price: 20 });
  await ticket.save();

  const user = signin();

  const { body: order1 } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .delete(`/api/orders/${order1.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  expect(natsWrapper.client().publish).toHaveBeenCalled();
});
