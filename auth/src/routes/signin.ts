import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";

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

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("User not found");
    }

    // const user = User.build({ email, password });
    // await user.save();

    // const userJwt = jwt.sign(
    //   {
    //     id: user.id,
    //     email: user.email,
    //   },
    //   process.env.JWT_KEY!
    // );

    // req.session = { jwt: userJwt };
    res.status(201).send({});
  }
);

export { router as signinRouter };
