const { Segments, Joi } = require("celebrate");

const productValidator = new Object();

productValidator.update = {
    [Segments.PARAMS]: Joi.object().keys({
       shirt_id = Joi.number().integer()
    }),
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string.required(),
       /*  product_type: req.body.product_type,  nao sei o tipo*/
    })
},
productValidator.update = {},
productValidator.update = {},
productValidator.update = {},


module.exports = productValidator;