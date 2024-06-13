import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth } from "@mroc/ex-ms-common";
import { validateRequest } from "@mroc/ex-ms-common";
import { Ticket } from "../models/ticket";
import { TickerCreatedPublisher } from "../events/publishers/ticket-created-publisher";

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
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });

    await ticket.save();

    // new TickerCreatedPublisher().publish({
    //   id: ticket.id,
    //   title: ticket.title,
    //   price: ticket.price,
    //   userId: ticket.userId,
    // });

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };