const { Segments, Joi } = require("celebrate");

//foi testado, alguns nao funcionam

const orderValidator = new Object();

orderValidator.update = { ///ok
    [Segments.PARAMS]: Joi.object().keys({
        order_id: Joi.string().required(),
     }),
     [Segments.BODY]: Joi.object().keys({
         is_paid: Joi.number().integer().required(),
         status: Joi.string(),
         shipping: Joi.number().required(),
     })
},
orderValidator.create = { //ok
    [Segments.BODY]: Joi.object().keys({
        address_id: Joi.string().required(),
        products: Joi.array().items({
            shirt_model_id: Joi.number().integer().required(),
            amount: Joi.number().integer().required(),
            logo_link: Joi.string().required(),
            size: Joi.string()
            .valid("PP", "P", "M", "G", "GG", "XG")
            .required(),
        }).required()
        
    })
    
},
orderValidator.getUserOrder = {//???
    [Segments.PARAMS]: Joi.object().keys({
        user_id: Joi.string().required(),
    }),
    [Segments.QUERY]: Joi.object().keys({
        filters:Joi.object().required(),
    })
},
orderValidator.delete = { //ok
    [Segments.PARAMS]: Joi.object().keys({
        order_id: Joi.string().required(),
     })
},
orderValidator.getOrders = { //???
    [Segments.PARAMS]: Joi.object().keys({
        user_id: Joi.string().required(),
     }),
     [Segments.QUERY]: Joi.object().keys({
        filters: Joi.object().required(),
     })
},
orderValidator.getProductsFromOrder = {//ok
    [Segments.PARAMS]: Joi.object().keys({
        order_id: Joi.string().required(),
     })
},
orderValidator.createOrderAddress = {//ok
    [Segments.BODY]: Joi.object().keys({
        street: Joi.string().required(),
        neighborhood: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        complement: Joi.string().required(),
        zip_code: Joi.string().length(8).required(),
     })
},
orderValidator.updateOrderAddress = {//ok
    [Segments.PARAMS]: Joi.object().keys({
        order_address_id: Joi.string().required(),
     }),
     [Segments.BODY]: Joi.object().keys({
        street: Joi.string().required(),
        neighborhood: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        complement: Joi.string().required(),
        zip_code: Joi.string().length(8).required(),
     })
},
orderValidator.deleteOrderAddress = {//ok
    [Segments.PARAMS]: Joi.object().keys({
        order_address_id: Joi.string().required(),
     })
}
module.exports = orderValidator;