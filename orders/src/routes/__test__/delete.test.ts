// import request from "supertest";
// import { app } from "../../app";
// import { natsWrapper } from "@mroc/ex-ms-common";

// it("return 400 if user provides invalid title or price", async () => {
//   const cookie = signin();

//   const response0 = await request(app)
//     .post("/api/tickets/")
//     .set("Cookie", cookie)
//     .send({ title: "Title", price: 10 });

//   await request(app)
//     .put(`/api/tickets/${response0.body.id}`)
//     .set("Cookie", cookie)
//     .send({ title: "", price: 20 })
//     .expect(400);
// });

// it("updates ticket", async () => {
//   const cookie = signin();

//   const response0 = await request(app)
//     .post("/api/tickets/")
//     .set("Cookie", cookie)
//     .send({ title: "Title", price: 10 });

//   const respose1 = await request(app)
//     .put(`/api/tickets/${response0.body.id}`)
//     .set("Cookie", cookie)
//     .send({ title: "New Title", price: 20 })
//     .expect(200);
//   expect(respose1.body.title).toEqual("New Title");
//   expect(respose1.body.price).toEqual(20);
// });

// it("Publishes an event", async () => {
//   const cookie = signin();

//   const response0 = await request(app)
//     .post("/api/tickets/")
//     .set("Cookie", cookie)
//     .send({ title: "Title", price: 10 });

//   await request(app)
//     .put(`/api/tickets/${response0.body.id}`)
//     .set("Cookie", cookie)
//     .send({ title: "New Title", price: 20 })
//     .expect(200);

//   expect(natsWrapper.client().publish).toHaveBeenCalled();
// });
