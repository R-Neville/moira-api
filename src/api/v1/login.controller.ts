import { NextFunction, Request, Response } from "express";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { User } from "../../sequelize/models/user.model";
import { respond, IMoiraResponse } from "../../utils";
import MoiraError from "../../exceptions/MoiraError";
import { HttpStatus } from "../../HttpStatus";

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
      next(
        new MoiraError({
          title: "Invalid login credentials",
          detail: "Incorrect username or password",
          httpStatus: HttpStatus.BAD_REQUEST,
        })
      );
    }
  } catch (e) {
    const error = e as Error;
    next(
      new MoiraError({
        title: error.name,
        detail: error.message,
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    );
  }
}
