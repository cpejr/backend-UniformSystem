const { Segments, Joi } = require("celebrate");


// testado e ok. Somente uma dúvida

const productValidator = new Object();


productValidator.createProduct = {//ok
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
productValidator.addProductModel = {//ok
    [Segments.PARAMS]: Joi.object().keys({
        product_id: Joi.number().integer().required()
     }),
     [Segments.BODY]: Joi.object().keys({
        file: Joi.string().optional(),
        is_main: Joi.boolean().required(),
		img_link: Joi.string().required(),
		price: Joi.number().required(),
		gender: Joi.valid("M","F").required(),
		model_description: Joi.string().required()
     })

},
productValidator.getProductModel = {//ok
    [Segments.PARAMS]: Joi.object().keys({
        product_id : Joi.number().integer().required()
     })    
},
productValidator.allModels = {
    [Segments.QUERY]: Joi.object().keys({
        product_type: Joi.string().optional(),
        gender: Joi.valid("M","F").optional(),
        minprice: Joi.number().optional(),
        maxprice: Joi.number().optional(),
        page: Joi.number().optional().min(1)
    })
},
productValidator.deleteProduct = {//ok
    [Segments.PARAMS]: Joi.object().keys({
        product_id : Joi.number().integer().required()
     }),
},
productValidator.deleteModel = { //ok ? deu internal server error
    [Segments.PARAMS]: Joi.object().keys({
        model_id : Joi.string().required()
     }),
},
productValidator.updateProduct = { //ok
/*   Comentado pra se caso for necessário mudar depois
     [Segments.PARAMS]: Joi.object().keys({
        product_id : Joi.number().integer().required()
     }), */
    [Segments.BODY]: Joi.object().keys({
       product_id : Joi.number().integer().required(),
       updated_fields : Joi.object({
           name: Joi.string().required(),
       }).required()
     }),
},
productValidator.updateModel = { //ok
    [Segments.PARAMS]: Joi.object().keys({
        model_id : Joi.number().integer().required()
     }),
    [Segments.BODY]: Joi.object().keys({
        // model_id : Joi.number().integer().required(),
        // file: Joi.string().optional(),
        // updated_fields : Joi.object({
        //     model_description: Joi.string().required(),
        // }).required()
        file: Joi.string().optional(),
        is_main: Joi.boolean().optional(),
		img_link: Joi.string().optional(),
		price: Joi.number().optional(),
		gender: Joi.valid("M","F").optional(),
		model_description: Joi.string().optional()
     }),
},


module.exports = productValidator;