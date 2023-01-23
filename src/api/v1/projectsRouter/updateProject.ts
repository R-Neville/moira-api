import { Request, Response, NextFunction } from "express";
import { processToken } from "../token-utils";
import { Project } from "../../../sequelize/models/project.model";
import { respond, IMoiraResponse } from "../../../utils";
import { HttpStatus } from "../../../HttpStatus";
import internalServerError from "../../../exceptions/interalServerError";
import resourceNotFound from "../../../exceptions/resourceNotFound";

export default async function updateProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userInfo = processToken(req, next);
  const { id } = req.params;

  try {
    const project = await Project.findOne({ where: { id } });

    if (project && project.creatorId === userInfo.id) {
      const updatedProject = await project.update(req.body);
      respond(res, {
        success: true,
        status: HttpStatus.OK,
        data: updatedProject,
      } as IMoiraResponse);
    } else {
      next(resourceNotFound("Project", id));
    }
  } catch (e) {
    next(internalServerError);
  }
}
