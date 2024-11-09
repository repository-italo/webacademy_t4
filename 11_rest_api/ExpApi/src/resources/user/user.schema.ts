import Joi from "joi";

const schema = Joi.object().keys({
   firstName: Joi.string().min(1).max(90),
   lastName: Joi.string().min(1).max(90),
   email: Joi.string().email(),
   password: Joi.string().min(6).max(60),
   userTypeId: Joi.string(),
})

export default schema;