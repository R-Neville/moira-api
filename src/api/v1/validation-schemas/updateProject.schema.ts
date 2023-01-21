import Joi from "joi";

const updateProjectSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
});

export default updateProjectSchema;
