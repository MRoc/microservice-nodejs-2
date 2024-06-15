import express, { Request, Response } from "express";

const router = express.Router();

router.delete("/api/orders/:oderId", async (req: Request, res: Response) => {
  res.send({});
});

export { router as deleteOrderRouter };
