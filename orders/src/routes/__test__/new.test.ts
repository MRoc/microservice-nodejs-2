import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { Order } from "../../models/order";
import { OrderStatus } from "@mroc/ex-ms-common/build/events/types/order-status";
import { natsWrapper } from "@mroc/ex-ms-common/build";

it("can only be accessed if user is signed in", async () => {
  await request(app).post("/api/orders").send({}).expect(401);
});

it("returns error if no ticketId is provided", async () => {
  await request(app)
    .post("/api/orders")
    .set("Cookie", signin())
    .send({})
    .expect(400);
});

it("returns error if ticket does not exist", async () => {
  await request(app)
    .post("/api/orders")
    .set("Cookie", signin())
    .send({
      ticketId: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it("returns error if ticket already reserved", async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "Title",
    price: 20,
  });
  await ticket.save();

  const order = Order.build({
    userId: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Cancelled,
    expiresAt: new Date(),
    ticket: ticket,
  });
  await order.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", signin())
    .send({
      ticketId: ticket.id,
    })
    .expect(201);
});

it("Publishes an event", async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "Title",
    price: 20,
  });
  await ticket.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", signin())
    .send({
      ticketId: ticket.id,
    })
    .expect(201);

  expect(natsWrapper.client().publish).toHaveBeenCalled();
});
