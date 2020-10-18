const { Segments, Joi } = require("celebrate");

const orderValidator = new Object();

orderValidator.update = {
    [Segments.PARAMS]: Joi.object().keys({
        nome: Joi.string().required(),
     }),
     [Segments.BODY]: Joi.object().keys({
         nome: Joi.string().required(),
     })
},
orderValidator.update = {},
orderValidator.update = {},
orderValidator.update = {},


module.exports = orderValidator;