import { NextFunction, Request, Response } from "express";
import { User } from "../../../sequelize/models/user.model";
import { IMoiraResponse, respond } from "../../../utils";
import { HttpStatus } from "../../../HttpStatus";
import internalServerError from "../../../exceptions/interalServerError";

export default async function registerController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, username, password } = req.body;

  try {
    const userExists = await User.findOne({ where: { email, username } });
    if (userExists) {
      return respond(res, {
        success: false,
        status: HttpStatus.OK,
        error: {
          title: "User Already Exists",
          detail: `A user with the email ${email} already exists`,
        },
      } as IMoiraResponse);
    }
    const user = new User({ email, username, password });
    const savedUser = await user.save();
    respond(res, {
      success: true,
      status: HttpStatus.CREATED,
      data: {
        id: savedUser.id,
        email: savedUser.email,
        username: savedUser.username,
      },
    } as IMoiraResponse);
  } catch (e) {
    next(internalServerError);
  }
}
