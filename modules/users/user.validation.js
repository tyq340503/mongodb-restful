const Joi = require('joi');

const passwordTest = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/

module.exports = {
    signup: {
        email: Joi.string().email().required(),
        password: Joi.string().regex(passwordTest).required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        userName: Joi.string().required(),
    },
    passwordReg: passwordTest,
}