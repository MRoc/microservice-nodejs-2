import express from "express";
require("express-async-errors");
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@mroc/ex-ms-common";
const cors = require("cors");

const app = express();
app.set("trust proxy", true);
app.use(cors());
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
