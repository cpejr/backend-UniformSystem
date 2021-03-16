const { Segments, Joi } = require("celebrate");

const sessionValidator = new Object();

sessionValidator.signIn = {
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
};

sessionValidator.forgetPassword = {
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
    }),
};

module.exports = sessionValidator;
