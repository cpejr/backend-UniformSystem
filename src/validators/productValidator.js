const { Segments, Joi } = require("celebrate");


// testado e ok. Somente uma dúvida

const productValidator = new Object();


productValidator.createShirt = {//ok
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        product_type:  Joi.string().required(),
        models: Joi.array().items({
            is_main: Joi.boolean().required(),
            img_link: Joi.string(),
            price: Joi.number().required(),
            gender: Joi.valid('M','F').required(),
            model_description: Joi.string().required(),
        })
    })
},
productValidator.addShirtModel = {//ok
    [Segments.PARAMS]: Joi.object().keys({
        shirt_id: Joi.number().integer().required()
     }),
     [Segments.BODY]: Joi.object().keys({
        is_main: Joi.boolean().required(),
		img_link: Joi.string().required(),
		price: Joi.number().required(),
		gender: Joi.valid("M","F").required(),
		model_description: Joi.string().required()
     })

},
productValidator.getShirtModel = {//ok
    [Segments.PARAMS]: Joi.object().keys({
        shirt_id : Joi.number().integer().required()
     })    
},
productValidator.deleteShirt = {//ok
    [Segments.PARAMS]: Joi.object().keys({
        shirt_id : Joi.number().integer().required()
     }),
},
productValidator.deleteModel = { //ok ? deu internal server error
    [Segments.PARAMS]: Joi.object().keys({
        model_id : Joi.string().required()
     }),
},
productValidator.updateShirt = { //ok
/*   Comentado pra se caso for necessário mudar depois
     [Segments.PARAMS]: Joi.object().keys({
        shirt_id : Joi.number().integer().required()
     }), */
    [Segments.BODY]: Joi.object().keys({
       shirt_id : Joi.number().integer().required(),
       updated_fields : Joi.object({
           name: Joi.string().required(),
       }).required()
     }),
},
productValidator.updateModel = { //ok
    [Segments.PARAMS]: Joi.object().keys({
        model_id : Joi.number().integer()
     }),
    [Segments.BODY]: Joi.object().keys({
        model_id : Joi.number().integer().required(),
        updated_fields : Joi.object({
            model_description: Joi.string().required(),
        }).required()
     }),
},


module.exports = productValidator;