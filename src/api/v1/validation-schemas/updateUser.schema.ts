import Joi from "joi";
import {
  PASSWORD_REGEX,
  USERNAME_REGEX,
} from "../../../sequelize/models/user.model";

const updateUserSchema = Joi.object({
  email: Joi.string().email(),
  username: Joi.string().pattern(new RegExp(USERNAME_REGEX)),
  password: Joi.string().pattern(new RegExp(PASSWORD_REGEX)),
  password_confirmation: Joi.ref("password"),
});

export default updateUserSchema;
