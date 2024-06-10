import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { BadRequestError, validateRequest } from "@mroc/ex-ms-common";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/users/signin/hello", (req, res) => {
  res.send("Hi there!");
});

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError("Invalid credentials");
    }

    const validPassword = await Password.compare(user.password, password);
    if (!validPassword) {
      throw new BadRequestError("Invalid credentials");
    }

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = { jwt: userJwt };
    res.status(200).send(user);
  }
);

export { router as signinRouter };
