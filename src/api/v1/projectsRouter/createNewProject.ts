import { Request, Response, NextFunction } from "express";
import { processToken } from "../token-utils";
import { Project } from "../../../sequelize/models/project.model";
import { respond, IMoiraResponse } from "../../../utils";
import { HttpStatus } from "../../../HttpStatus";
import internalServerError from "../../../exceptions/interalServerError";

export default async function createNewProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userInfo = processToken(req, next);
  const { name, description } = req.body;
  try {
    const project = new Project({
      name,
      description,
      creatorId: userInfo.id,
      creator: userInfo.username,
    });
    const savedProject = await project.save();
    respond(res, {
      success: true,
      status: HttpStatus.CREATED,
      data: savedProject,
    } as IMoiraResponse);
  } catch (e) {
    next(internalServerError);
  }
}
