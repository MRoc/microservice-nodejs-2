import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth } from "@mroc/ex-ms-common";
import { BadRequestError, validateRequest } from "@mroc/ex-ms-common";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than zero"),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

export { router as createTicketRouter };
