import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

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

it("has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed if user is signed in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("returns a status other than 401 if user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({});
  expect(response.status).not.toEqual(401);
});

it("returns error if invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);
});

it("returns error if invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({
      title: "Title",
      price: -10,
    })
    .expect(400);
});

it("creates a ticket with valid params", async () => {
  const ticketsBefore = await Ticket.find({});
  expect(ticketsBefore.length).toEqual(0);

  const title = "Title";
  const price = 20;

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({
      title,
      price,
    });

  expect(response.status).toEqual(201);
  expect(response.body.title).toBe(title);
  expect(response.body.price).toBe(price);

  const ticketsAfter = await Ticket.find({});
  expect(ticketsAfter.length).toEqual(1);
});
