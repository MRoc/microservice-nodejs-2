import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns tickets if ticket is found", async () => {
  for (const _ in [0, 1, 2]) {
    await request(app)
      .post("/api/tickets/")
      .set("Cookie", signin())
      .send({ title: "Title", price: "20" });
  }

  const respose = await request(app).get(`/api/tickets`).send().expect(200);

  expect(respose.body.length).toEqual(3);
});
