import request from "supertest";
import { app } from "../../app";

it("signs in when valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

  const response = await request(app)
    .post("/api/users/signout")
    .send()
    .expect(200);

  expect(response.get("Set-Cookie")![0]).toMatch(/^session=; path=\/;/);
});
