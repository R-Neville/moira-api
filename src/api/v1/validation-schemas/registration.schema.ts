import Joi from "joi";
import {
  USERNAME_REGEX,
  PASSWORD_REGEX,
} from "../../../sequelize/models/user.model";

const registrationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email",
    "string.required": "Email required",
  }),
  username: Joi.string()
    .pattern(new RegExp(USERNAME_REGEX))
    .required()
    .messages({
      "string.required": "Username required",
      "string.pattern.base":
        "Username can only contain letters numbers and underscores",
    }),
  password: Joi.string()
    .pattern(new RegExp(PASSWORD_REGEX))
    .required()
    .messages({
      "string.required": "Password required",
      "string.pattern.base": `Password must be at least 8 characters long and include one capital letter, one number, and one symbol`,
      "any.ref": "Password's don't match",
    }),
  password_confirmation: Joi.ref("password"),
});

export default registrationSchema;
