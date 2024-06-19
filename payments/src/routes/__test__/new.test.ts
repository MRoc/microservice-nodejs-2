import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/order";
import { OrderStatus } from "@mroc/ex-ms-common/build/events/types/order-status";
import { stripe } from "../../stripe";

jest.mock("../../stripe");

it("returns 404 when order does not exist", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", signin())
    .send({
      orderId: new mongoose.Types.ObjectId().toHexString(),
      token: "token",
    })
    .expect(404);
});

it("returns 401 when order does not belong to user", async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    userId: new mongoose.Types.ObjectId().toHexString(),
    price: 10,
    status: OrderStatus.Created,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", signin())
    .send({
      orderId: order.id,
      token: "token",
    })
    .expect(401);
});

it("returns 400 when already cancelled", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();

  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    userId,
    price: 10,
    status: OrderStatus.Cancelled,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", signin(userId))
    .send({
      orderId: order.id,
      token: "token",
    })
    .expect(400);
});

it("returns 201 with valid inputs", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();

  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    userId,
    price: 10,
    status: OrderStatus.AwaitingPayment,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", signin(userId))
    .send({
      orderId: order.id,
      token: "tok_visa",
    })
    .expect(201);

  const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];
  expect(chargeOptions.source).toEqual("tok_visa");
  expect(chargeOptions.amount).toEqual(1000);
  expect(chargeOptions.currency).toEqual("usd");
});
