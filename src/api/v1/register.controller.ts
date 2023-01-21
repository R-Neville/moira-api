import { NextFunction, Request, Response } from "express";
import { Error } from "sequelize";
import { User } from "../../sequelize/models/user.model";
import { IMoiraResponse, respond } from "../../utils";
import MoiraError from "../../exceptions/MoiraError";
import { HttpStatus } from "../../HttpStatus";

export default async function registerController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, username, password } = req.body;

  try {
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
    const error = e as Error;
    return next(
      new MoiraError({
        title: error.name,
        detail: error.message,
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    );
  }
}
