import "express-async-errors";
import { errorHandler, NotFoundError } from "@mroc/ex-ms-common";
import { json } from "body-parser";
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

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
