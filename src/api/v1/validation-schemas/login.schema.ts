import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email",
    "any.required": "Email required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password required",
  }),
});

export default loginSchema;
