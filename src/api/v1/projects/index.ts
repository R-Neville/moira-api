import express from "express";
import authorizeRequest from "../authorizeRequest";
import makeSchemaValidator from "../../../middleware/makeSchemaValidator";
import newProjectSchema from "../validation-schemas/newProject.schema";
import getAllProjects from "./getAllProjects";
import createNewProject from "./createNewProject";

const projectsRouter = express.Router();

projectsRouter.get("/", authorizeRequest(), getAllProjects);

projectsRouter.post(
  "/",
  authorizeRequest(),
  makeSchemaValidator(newProjectSchema),
  createNewProject
);

export default projectsRouter;
