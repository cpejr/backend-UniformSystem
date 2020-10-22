const { Segments, Joi } = require("celebrate");

const addressValidator = new Object();

//testado e ok

addressValidator.create = {
    //ok
    [Segments.PARAMS]: Joi.object().keys({
        user_id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
        address: Joi.object({
            street: Joi.string().required(),
            neighborhood: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            country: Joi.string().required(),
            complement: Joi.string().required(),
            zip_code: Joi.number().integer().required(),
        }).required(),
    }),
};

addressValidator.update = {
    //ok
    [Segments.PARAMS]: Joi.object().keys({
        address_id: Joi.number().integer().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
        updatedFields: Joi.object({
            street: Joi.string().required(),
            neighborhood: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            country: Joi.string().required(),
            complement: Joi.string().required(),
            zip_code: Joi.number().integer().required(),
        }).required(),
    }),
};

addressValidator.delete = {
    //ok??
    [Segments.PARAMS]: Joi.object().keys({
        address_id: Joi.number().integer().required(),
    }),
};


module.exports = addressValidator;
