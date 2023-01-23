import express, { Request, Response } from "express";
import makeSchemaValidator from "../../middleware/makeSchemaValidator";
import registrationSchema from "./validation-schemas/registration.schema";
import loginSchema from "./validation-schemas/login.schema";
import registerController from "./auth/register.controller";
import loginController from "./auth/login.controller";
import projectsRouter from "./projectsRouter";
import authorizeRequest from "./authorizeRequest";
import usersRouter from "./usersRouter";

const v1Router = express.Router();

v1Router.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Moira API",
  });
});

// Auth routes
v1Router.post(
  "/register",
  makeSchemaValidator(registrationSchema),
  registerController
);
v1Router.post("/login", makeSchemaValidator(loginSchema), loginController);

// Users routes
v1Router.use("/users", authorizeRequest(), usersRouter);

// Projects routes
v1Router.use("/projects", authorizeRequest(), projectsRouter);

export default v1Router;
