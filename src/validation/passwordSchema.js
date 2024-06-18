const Joi = require("joi");

const passwordValidate = Joi.object({
    oldPassword: Joi.string().min(8)
        .regex(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/) // Password harus mengandung huruf dan angka, dan minimal 8 karakter
        .message('Password must contain letters and numbers only, and be at least 8 characters long')
        .required(),
    newPassword: Joi.string().min(8)
        .regex(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/)
        .message('Password must contain letters and numbers only, and be at least 8 characters long')
        .required(),
    confirmPassword: Joi.string().valid(Joi.ref('newPassword')) // Validasi apakah password sama dengan confirmPassword
        .messages({
            'any.only': 'Passwords do not match'
        })
        .required()
}).options({ abortEarly: false });

module.exports = { passwordValidate };
