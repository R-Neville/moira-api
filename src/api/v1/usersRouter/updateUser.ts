import { Request, Response, NextFunction } from "express";
import { processToken } from "../token-utils";
import { User } from "../../../sequelize/models/user.model";
import internalServerError from "../../../exceptions/interalServerError";
import resourceNotFound from "../../../exceptions/resourceNotFound";
import { IMoiraResponse } from "../../../utils";
import { HttpStatus } from "../../../HttpStatus";
import { respond } from "../../../utils";

export default async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userInfo = processToken(req, next);
  const { id } = req.params;
  const { email, username, password } = req.body;

  try {
    const user = await User.findOne({ where: { id } });
    if (user && user.id === userInfo.id) {
      user.email = email || user.email;
      user.username = username || user.username;
      user.password = password || user.password;
      const updatedUser = await user.save();
      respond(res, {
        success: true,
        status: HttpStatus.OK,
        data: {
          email: updatedUser.email,
          username: updatedUser.username,
        },
      } as IMoiraResponse);
    } else {
      next(resourceNotFound("User", id));
    }
  } catch (e) {
    next(internalServerError);
  }
}
