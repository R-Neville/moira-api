import { NextFunction, Request, Response } from "express";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { User } from "../../../sequelize/models/user.model";
import { respond, IMoiraResponse } from "../../../utils";
import { HttpStatus } from "../../../HttpStatus";
import internalServerError from "../../../exceptions/interalServerError";

export default async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      const passwordValid = await compare(password, user.password);
      if (passwordValid) {
        const token = sign(
          {
            id: user.id,
            email: user.email,
            username: user.username,
          },
          process.env.JWT_SECRET!
        );
        respond(res, {
          success: true,
          status: HttpStatus.OK,
          data: {
            id: user.id,
            email,
            username: user.username,
            token,
          },
        } as IMoiraResponse);
      }
    } else {
      return respond(res, {
        success: false,
        status: HttpStatus.OK,
        error: {
          title: "Invalid Login Credentials",
          detail: "Incorrect username or password",
        },
      } as IMoiraResponse);
    }
  } catch (e) {
    next(internalServerError);
  }
}
