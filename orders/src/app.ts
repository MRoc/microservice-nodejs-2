import "express-async-errors";
import { currentUser, errorHandler, NotFoundError } from "@mroc/ex-ms-common";
import { deleteOrderRouter } from "./routes/delete";
import { indexOrderRouter } from "./routes/index";
import { json } from "body-parser";
import { newOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";
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

app.use(currentUser);
app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
