import express from "express";
import makeSchemaValidator from "../../../middleware/makeSchemaValidator";
import updateUserSchema from "../validation-schemas/updateUser.schema";
import deleteUserSchema from "../validation-schemas/deleteUser.schema";
import updateUser from "./updateUser";
import deleteUser from "./deleteUser";

const usersRouter = express.Router();

usersRouter.put("/:id", makeSchemaValidator(updateUserSchema), updateUser);
usersRouter.delete("/:id", makeSchemaValidator(deleteUserSchema), deleteUser);

export default usersRouter;
