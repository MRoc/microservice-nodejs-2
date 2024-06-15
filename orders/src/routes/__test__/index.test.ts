import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { Order } from "../../models/order";
import { OrderStatus } from "@mroc/ex-ms-common/build/events/types/order-status";

it("can only be accessed if user is signed in", async () => {
  await request(app).get("/api/orders").send({}).expect(401);
});

it("returns orders for current user", async () => {
  const buildTicket = async () => {
    const ticket = await Ticket.build({ title: "Title", price: 20 });
    ticket.save();
    return ticket;
  };

  const user1 = signin();
  const user2 = signin();

  const ticket1 = await buildTicket();
  const ticket2 = await buildTicket();
  const ticket3 = await buildTicket();

  const { body: order1 } = await request(app)
    .post("/api/orders")
    .set("Cookie", user2)
    .send({ ticketId: ticket1.id })
    .expect(201);

  const { body: order2 } = await request(app)
    .post("/api/orders")
    .set("Cookie", user2)
    .send({ ticketId: ticket2.id })
    .expect(201);

  const { body: orders } = await request(app)
    .get("/api/orders")
    .set("Cookie", user2)
    .send()
    .expect(200);

  expect(orders.length).toBe(2);
  expect(orders[0].id).toBe(order1.id);
  expect(orders[1].id).toBe(order2.id);
  expect(orders[0].ticket.id).toBe(ticket1.id);
  expect(orders[1].ticket.id).toBe(ticket2.id);
});

// it("returns error if ticket does not exist", async () => {
//   await request(app)
//     .post("/api/orders")
//     .set("Cookie", signin())
//     .send({
//       ticketId: new mongoose.Types.ObjectId().toHexString(),
//     })
//     .expect(404);
// });

// it("returns error if ticket already reserved", async () => {
//   const ticket = Ticket.build({
//     title: "Title",
//     price: 20,
//   });
//   await ticket.save();

//   const order = Order.build({
//     userId: new mongoose.Types.ObjectId().toHexString(),
//     status: OrderStatus.Cancelled,
//     expiresAt: new Date(),
//     ticket: ticket,
//   });
//   await order.save();

//   await request(app)
//     .post("/api/orders")
//     .set("Cookie", signin())
//     .send({
//       ticketId: ticket.id,
//     })
//     .expect(201);
// });

// it.todo("Publishes an event");
