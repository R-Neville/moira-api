import express from "express";
import makeSchemaValidator from "../../../middleware/makeSchemaValidator";
import newProjectSchema from "../validation-schemas/newProject.schema";
import getAllProjects from "./getAllProjects";
import createNewProject from "./createNewProject";
import deleteProject from "./deleteProject";
import updateProjectSchema from "../validation-schemas/updateProject.schema";
import updateProject from "./updateProject";
import getProject from "./getProject";

const projectsRouter = express.Router();

projectsRouter.get("/", getAllProjects);

projectsRouter.get("/:id", getProject);

projectsRouter.post(
  "/",
  makeSchemaValidator(newProjectSchema),
  createNewProject
);

projectsRouter.put(
  "/:id",
  makeSchemaValidator(updateProjectSchema),
  updateProject
);

projectsRouter.delete("/:id", deleteProject);

export default projectsRouter;
