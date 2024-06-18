const Joi = require("joi");

const userValidate = Joi.object({
    username: Joi.string()
        .min(5)
        .max(50)
        .required(),
    email: Joi.string()
        .min(10)
        .required(),
}).options({ abortEarly: false });

module.exports = { userValidate };