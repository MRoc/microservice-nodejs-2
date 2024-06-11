import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

// it("return 404 if ID does not exist", async () => {
//   const id = new mongoose.Types.ObjectId().toHexString();
//   await request(app)
//     .put(`/api/tickets/${id}`)
//     .set("Cookie", signin())
//     .send({
//       title: "Title",
//       price: 20,
//     })
//     .expect(404);
// });

// it("return 401 if user is not authenticated", async () => {
//   const id = new mongoose.Types.ObjectId().toHexString();
//   await request(app)
//     .put(`/api/tickets/${id}`)
//     .send({
//       title: "Title",
//       price: 20,
//     })
//     .expect(401);
// });

// it("return 401 if user is not authorized", async () => {
//   const response0 = await request(app)
//     .post("/api/tickets/")
//     .set("Cookie", signin())
//     .send({ title: "Title", price: 10 });

//   await request(app)
//     .put(`/api/tickets/${response0.body.id}`)
//     .set("Cookie", signin())
//     .expect(401)
//     .send({ title: "Title 2", price: 20 });
// });

it("return 400 if user provides invalid title or price", async () => {
  const cookie = signin();

  const response0 = await request(app)
    .post("/api/tickets/")
    .set("Cookie", cookie)
    .send({ title: "Title", price: 10 });

  await request(app)
    .put(`/api/tickets/${response0.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 20 })
    .expect(400);
});

it("updates ticket", async () => {
  const cookie = signin();

  const response0 = await request(app)
    .post("/api/tickets/")
    .set("Cookie", cookie)
    .send({ title: "Title", price: 10 });

  const respose1 = await request(app)
    .put(`/api/tickets/${response0.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "New Title", price: 20 })
    .expect(200);
  expect(respose1.body.title).toEqual("New Title");
  expect(respose1.body.price).toEqual(20);
});
