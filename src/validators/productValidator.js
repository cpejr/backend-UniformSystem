const { Segments, Joi } = require("celebrate");

const productValidator = {};

productValidator.searchProducts = {
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().min(1).optional(),
    gender: Joi.string().valid("M", "F").optional(),
    name: Joi.string().optional(),
    product_type: Joi.string().optional(),
    available: Joi.boolean().optional(),
    maxprice: Joi.number().optional(),
    minprice: Joi.number().optional(),
  }),
};

productValidator.searchProductById = {
  [Segments.PARAMS]: Joi.object().keys({
    product_id: Joi.number().integer().required(),
  }),
};

productValidator.createProduct = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    product_type: Joi.string().required(),
    height: Joi.number().positive().required(),
    length: Joi.number().positive().required(),
    weight: Joi.number().positive().required(),
    width: Joi.number().positive().required(),
  }),
};
productValidator.addProductModel = {
  [Segments.PARAMS]: Joi.object().keys({
    product_id: Joi.number().integer().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    file: Joi.string().optional(),
    available: Joi.boolean().required(),
    img_link: Joi.string().required(),
    price: Joi.number().required(),
    model_description: Joi.string().required(),
    gender: Joi.valid("M", "F").required(),
  }),
};
productValidator.getProductModel = {
  [Segments.PARAMS]: Joi.object().keys({
    product_id: Joi.number().integer().required(),
  }),
  [Segments.QUERY]: Joi.object().keys({
    price: Joi.number().optional(),
    gender: Joi.valid("M", "F").optional(),
    available: Joi.boolean().optional(),
  }),
};
productValidator.allModels = {
  [Segments.QUERY]: Joi.object().keys({
    name: Joi.string().optional(),
    product_type: Joi.string().optional(),
    gender: Joi.valid("M", "F").optional(),
    minprice: Joi.number().optional(),
    maxprice: Joi.number().optional(),
    page: Joi.number().optional().min(1),
  }),
};
productValidator.deleteProduct = {
  [Segments.PARAMS]: Joi.object().keys({
    product_id: Joi.number().integer().required(),
  }),
};
productValidator.deleteModel = {
  [Segments.PARAMS]: Joi.object().keys({
    model_id: Joi.string().required(),
  }),
};
productValidator.updateProduct = {
  [Segments.PARAMS]: Joi.object().keys({
    product_id: Joi.number().integer().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    updated_fields: Joi.object({
      name: Joi.string().optional(),
      description: Joi.string().optional(),
    }).required(),
  }),
};
productValidator.updateModel = {
  [Segments.PARAMS]: Joi.object().keys({
    model_id: Joi.number().integer().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    file: Joi.string().optional(),
    img_link: Joi.string().optional(),
    price: Joi.number().optional(),
    gender: Joi.valid("M", "F").optional(),
    model_description: Joi.string().optional(),
    available: Joi.boolean().optional(),
  }),
};

module.exports = productValidator;
