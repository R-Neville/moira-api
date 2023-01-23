import { NextFunction, Request, Response } from "express";
import { compare } from "bcryptjs";
import { processToken } from "../token-utils";
import { User } from "../../../sequelize/models/user.model";
import internalServerError from "../../../exceptions/interalServerError";
import { IMoiraResponse, respond } from "../../../utils";
import resourceNotFound from "../../../exceptions/resourceNotFound";
import { HttpStatus } from "../../../HttpStatus";

export default async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userInfo = processToken(req, next);
  const { id } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({ where: { id } });
    if (user && user.id === userInfo.id) {
      const passwordValid = await compare(password, user.password);
      if (passwordValid) {
        await user.destroy();
        respond(res, {
          success: true,
          status: HttpStatus.OK,
        } as IMoiraResponse);
      } else {
        respond(res, {
          success: false,
          status: HttpStatus.UNAUTHORIZED,
          error: {
            title: "Unauthorized",
            detail: "Password invalid",
          },
        } as IMoiraResponse);
      }
    } else {
      next(resourceNotFound("User", id));
    }
  } catch (e) {
    next(internalServerError);
  }
}
