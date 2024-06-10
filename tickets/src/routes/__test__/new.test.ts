import request from "supertest";
import { app } from "../../app";

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

it("creates a ticket with valid params", async () => {});

// it("signs in when valid credentials", async () => {
//   await request(app)
//     .post("/api/tickets/signup")
//     .send({
//       email: "test@test.com",
//       password: "password",
//     })
//     .expect(201);

//   const response = await request(app)
//     .post("/api/users/signin")
//     .send({
//       email: "test@test.com",
//       password: "password",
//     })
//     .expect(200);

//   expect(response.get("Set-Cookie")).toBeDefined();
// });
