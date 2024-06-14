import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

jest.mock("@mroc/ex-ms-common", () => ({
  ...jest.requireActual("@mroc/ex-ms-common"),
  natsWrapper: {
    connect: jest.fn().mockResolvedValue(undefined),
    client: jest.fn().mockReturnValue({
      publish(subject: any, data: any, callback: () => void) {
        callback();
      },
    }),
  },
}));

it("return 404 if ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it("returns ticket if ticket is found", async () => {
  const title = "Title";
  const price = 20;

  const response0 = await request(app)
    .post("/api/tickets/")
    .set("Cookie", signin())
    .send({ title, price });
  expect(response0.status).toEqual(201);

  const respose1 = await request(app)
    .get(`/api/tickets/${response0.body.id}`)
    .send()
    .expect(200);

  expect(respose1.body.title).toEqual(title);
});
