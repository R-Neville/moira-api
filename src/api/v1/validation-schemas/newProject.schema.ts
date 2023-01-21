import Joi from "joi";

const newProjectSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

export default newProjectSchema;
