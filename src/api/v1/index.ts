import express, { Request, Response } from "express";
import makeSchemaValidator from "../../middleware/makeSchemaValidator";
import registrationSchema from "./validation-schemas/registration.schema";
import loginSchema from "./validation-schemas/login.schema";
import registerController from "./register.controller";
import loginController from "./login.controller";
import projectsRouter from "./projects";

const v1Router = express.Router();

v1Router.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Moira API",
  });
});

v1Router.post("/register", makeSchemaValidator(registrationSchema), registerController);
v1Router.post("/login", makeSchemaValidator(loginSchema), loginController);
v1Router.use("/projects", projectsRouter);

export default v1Router;
