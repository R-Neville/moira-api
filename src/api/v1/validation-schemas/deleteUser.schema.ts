import Joi from "joi";

const deleteUserSchema = Joi.object({
  password: Joi.string().required(),
});

export default deleteUserSchema;