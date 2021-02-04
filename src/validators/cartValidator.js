const { Segments, Joi } = require("celebrate");

const addressValidator = new Object();

//Foi testado, quase tudo ok

//deixei o user_id comentado em alguns pois sei que vai ser necessario
//em algum momento, mas nao agora
addressValidator.addToCart = {
  //ok
  [Segments.BODY]: Joi.object().keys({
    product_model_id: Joi.number().integer().required(),
    //não se esses tamanhos já servem:
    size: Joi.string().valid("PP", "P", "M", "G", "GG", "XG").required(),
    amount: Joi.number().integer().required(),
    logo_link: Joi.optional(), //a logo é opcional?
    gender: Joi.string().valid("M", "F").required(),
    isLogoUpload: Joi.boolean(),
  }),
};

addressValidator.updateCart = {
  [Segments.PARAMS]: Joi.object().keys({
    product_in_cart_id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    amount: Joi.number().integer(),
  }),
};

addressValidator.removeFromCart = {
  [Segments.PARAMS]: Joi.object().keys({
    product_in_cart_id: Joi.string().required(),
  }),
};

addressValidator.emptyCart = {
  //nao esta pronta??
  /*  [Segments.PARAMS]: Joi.object().keys({
        user_id: Joi.string().required(),
    }), */
  [Segments.BODY]: Joi.object().keys({
    /* user_id: Joi.string().required(), */
  }),
};

module.exports = addressValidator;
