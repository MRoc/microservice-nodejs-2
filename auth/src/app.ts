import "express-async-errors";
import { currentUserRouter } from "./routes/current-user";
import { errorHandler, NotFoundError } from "@mroc/ex-ms-common";
import { json } from "body-parser";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import cookieSession from "cookie-session";
import cors from "cors";
import express from "express";
import SWStats from "swagger-stats";

const app = express();
app.set("trust proxy", true);
app.use(SWStats.getMiddleware({}));
app.use(cors());
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
    // secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
