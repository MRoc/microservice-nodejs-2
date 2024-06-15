import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { Order } from "../../models/order";
import { OrderStatus } from "@mroc/ex-ms-common/build/events/types/order-status";
// import { Ticket } from "../../models/ticket";
// import { natsWrapper } from "@mroc/ex-ms-common";

it("has a route handler listening to post requests", async () => {
  const response = await request(app).post("/api/orders").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed if user is signed in", async () => {
  await request(app).post("/api/orders").send({}).expect(401);
});

it("returns a status other than 401 if user is signed in", async () => {
  const response = await request(app)
    .post("/api/orders")
    .set("Cookie", signin())
    .send({});
  expect(response.status).not.toEqual(401);
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
    title: "Title",
    price: 20,
  });
  await ticket.save();

  const order = Order.build({
    userId: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.AwaitingPayment,
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
    .expect(400);
});

// it("reserves a ticket", async () => {
//   const ticketsBefore = await Ticket.find({});
//   expect(ticketsBefore.length).toEqual(0);

//   const title = "Title";
//   const price = 20;

//   const response = await request(app)
//     .post("/api/tickets")
//     .set("Cookie", signin())
//     .send({
//       title,
//       price,
//     });

//   expect(response.status).toEqual(201);
//   expect(response.body.title).toBe(title);
//   expect(response.body.price).toBe(price);

//   const ticketsAfter = await Ticket.find({});
//   expect(ticketsAfter.length).toEqual(1);
// });

// it("Publishes an event", async () => {
//   const title = "Title";
//   const price = 20;

//   await request(app).post("/api/tickets").set("Cookie", signin()).send({
//     title,
//     price,
//   });

//   expect(natsWrapper.client().publish).toHaveBeenCalled();
// });
