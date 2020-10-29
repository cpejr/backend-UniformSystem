const { Segments, Joi } = require("celebrate");

const addressValidator = new Object();

//Foi testado, quase tudo ok

//deixei o user_id comentado em alguns pois sei que vai ser necessario
//em algum momento, mas nao agora
addressValidator.addToCart = { //ok
    [Segments.BODY]: Joi.object().keys({
        product_model_id: Joi.string().required(),
        /* size: Joi.string().required(), comentado pois talvez seja melhor*/
        //não se esses tamanhos já servem:
        size: Joi.string().valid("PP", "P", "M", "G", "GG", "XG").required(),
        amount: Joi.number().integer().required(),
        logo_link: Joi.string(), //a logo é opcional?
    }),
};

addressValidator.updateCart = {//ok
    /*  [Segments.PARAMS]: Joi.object().keys({
        user_id: Joi.string().required(),
    }), */
    [Segments.BODY]: Joi.object().keys({
        /* user_id: Joi.string().required(), */
        updates: Joi.array().items({
            product_in_cart_id: Joi.number().integer(),
            updated_fields: Joi.object({
                amount: Joi.number().integer(),
                size: Joi.string()
                    .valid("PP", "P", "M", "G", "GG", "XG")
                    .required(),
            }),
        }).required(),
    }),
};

addressValidator.removeFromCart = { //ok??
    /*  [Segments.PARAMS]: Joi.object().keys({
        user_id: Joi.string().required(),
    }), */
    [Segments.BODY]: Joi.object().keys({
        product_in_cart_id: Joi.string().required(),
        /* user_id: Joi.string().required(), */
    }),
};

addressValidator.emptyCart = { //nao esta pronta??
    /*  [Segments.PARAMS]: Joi.object().keys({
        user_id: Joi.string().required(),
    }), */
    [Segments.BODY]: Joi.object().keys({
        /* user_id: Joi.string().required(), */
    })
       
};

module.exports = addressValidator;
