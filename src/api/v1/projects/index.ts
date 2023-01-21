import express, { NextFunction, Request, Response } from "express";
import authorizeRequest from "../authorizeRequest";
import { processToken } from "../token-utils";
import { Project } from "../../../sequelize/models/project.model";
import { IMoiraResponse, respond } from "../../../utils";
import { HttpStatus } from "../../../HttpStatus";
import MoiraError from "../../../exceptions/MoiraError";
import makeSchemaValidator from "../../../middleware/makeSchemaValidator";
import newProjectSchema from "../validation-schemas/newProject.schema";

const projectsRouter = express.Router();

projectsRouter.get(
  "/",
  authorizeRequest(),
  async (req: Request, res: Response, next: NextFunction) => {
    const userInfo = processToken(req, next);

    try {
      const projects = Project.findAll({ where: { id: userInfo.id } });
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
);

projectsRouter.post(
  "/",
  authorizeRequest(),
  makeSchemaValidator(newProjectSchema),
  async (req: Request, res: Response, next: NextFunction) => {
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
        status: 201,
        data: savedProject,
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
);

export default projectsRouter;
