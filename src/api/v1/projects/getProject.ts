import { Request, Response, NextFunction } from "express";
import { processToken } from "../token-utils";
import { Project } from "../../../sequelize/models/project.model";
import { respond, IMoiraResponse } from "../../../utils";
import MoiraError from "../../../exceptions/MoiraError";
import { HttpStatus } from "../../../HttpStatus";

export default async function getProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userInfo = processToken(req, next);
  const { id } = req.params;

  try {
    const project = await Project.findOne({ where: { id } });

    if (project && project.creatorId === userInfo.id) {
      respond(res, {
        success: true,
        status: HttpStatus.OK,
        data: project,
      } as IMoiraResponse);
    } else {
      next(
        new MoiraError({
          title: "Project Not Found",
          detail: `Project not found with id ${id}`,
          httpStatus: HttpStatus.NOT_FOUND,
        })
      );
    }
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
