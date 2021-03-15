const { Segments, Joi } = require("celebrate");

//foi testado, alguns nao funcionam

const orderValidator = new Object();

(orderValidator.update = {
  ///ok
  [Segments.PARAMS]: Joi.object().keys({
    order_id: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    checkout_cielo_order_number: Joi.string().required(),
    is_paid: Joi.number().integer().required(),
    status: Joi.string().required(),
    //  shipping: Joi.number().required(),
  }),
}),
  (orderValidator.create = {
    //ok
    [Segments.BODY]: Joi.object().keys({
      address_id: Joi.number().required(),
      service_code: Joi.string().required(),
      products: Joi.array()
        .items(
          Joi.object({
            amount: Joi.number().integer().required(),
            gender: Joi.string().valid("M", "F").required(),
            logo_link: Joi.string().required(),
            price: Joi.number().required(),
            product_model_id: Joi.string().required(),
            size: Joi.string()
              .valid("PP", "P", "M", "G", "GG", "XG")
              .required(),
          })
        )
        .required(),
    }),
  }),
  (orderValidator.getShipping = {
    //ok
    [Segments.PARAMS]: Joi.object().keys({
      zip: Joi.string().required(),
    }),
  }),
  (orderValidator.getUserOrder = {
    //???
    [Segments.PARAMS]: Joi.object().keys({
      user_id: Joi.string().required(),
    }),
    // [Segments.QUERY]: Joi.object().keys({
    //     filters:Joi.object().required(),
    // })
  }),
  (orderValidator.delete = {
    //ok
    [Segments.PARAMS]: Joi.object().keys({
      order_id: Joi.string().required(),
    }),
  }),
  (orderValidator.getOrders = {
    [Segments.QUERY]: Joi.object().keys({
      user_id: Joi.string().optional(),
      order_id: Joi.string().optional(),
      user_id: Joi.string().optional(),
      shipping_data_id: Joi.number().integer().optional(),
      status: Joi.string()
        .valid("waitingPayment", "preparing", "delivered", "pending")
        .optional(),
    }),
  }),
  (orderValidator.getProductsFromOrder = {
    //ok
    [Segments.PARAMS]: Joi.object().keys({
      order_id: Joi.string().required(),
    }),
  }),
  (orderValidator.createOrderAddress = {
    //ok
    [Segments.BODY]: Joi.object().keys({
      street: Joi.string().required(),
      neighborhood: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required(),
      complement: Joi.string().required(),
      zip_code: Joi.string().length(8).required(),
    }),
  }),
  (orderValidator.updateOrderAddress = {
    //ok
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
    }),
  }),
  (orderValidator.deleteOrderAddress = {
    //ok
    [Segments.PARAMS]: Joi.object().keys({
      order_address_id: Joi.string().required(),
    }),
  }),
  (orderValidator.deliverAtMail = {
    //ok
    [Segments.BODY]: Joi.object().keys({
      tracking_code: Joi.string().required(),
    }),
    [Segments.PARAMS]: Joi.object().keys({
      order_id: Joi.string().required(),
    }),
  });
module.exports = orderValidator;
