import Joi from "joi";

const schema = Joi.object().keys({
   name: Joi.string().min(3).max(90).required(),
   price: Joi.number().required,
   stockQuantity: Joi.number().integer().required()
});

export default schema;