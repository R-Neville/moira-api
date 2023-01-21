import { Request, Response, NextFunction } from "express";
import { processToken } from "../token-utils";
import { Project } from "../../../sequelize/models/project.model";
import { respond, IMoiraResponse } from "../../../utils";
import MoiraError from "../../../exceptions/MoiraError";
import { HttpStatus } from "../../../HttpStatus";

export default async function getAllProjects(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userInfo = processToken(req, next);

  try {
    const projects = await Project.findAll({ where: { creatorId: userInfo.id } });
    respond(res, {
      success: true,
      status: HttpStatus.OK,
      data: projects,
    } as IMoiraResponse);
  } catch (e) {
    next(
      new MoiraError({
        title: "Internal Server Error",
        detail: "Sorry - something went wrong on our end",
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    );
  }
}
