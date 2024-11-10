import Joi from "joi";

const schema = Joi.object().keys({
   firstName: Joi.string().min(1).max(90).required(),
   lastName: Joi.string().min(1).max(90).required(),
   email: Joi.string().email().required(),
   password: Joi.string().min(6).max(60).required(),
   userTypeId: Joi.string().required(),
})

export default schema;