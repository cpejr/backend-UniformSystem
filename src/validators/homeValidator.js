const { Segments, Joi } = require("celebrate");

const homeValidator = new Object();

homeValidator.update = {
    [Segments.BODY]: Joi.object().keys({
        textWhoWeAre: Joi.string().required(),
        textProducts: Joi.string().required(),
        contactInfo: Joi.object().keys({
            cellphone: Joi.string().required(),
            address: Joi.string().required(),
            email: Joi.string().required(),
            facebookUsername: Joi.string().required(),
            instagramUsername: Joi.string().required(),
            facebookLink: Joi.string().required(),
            instagramLink: Joi.string().required(),
            whatsAppLink: Joi.string().required(),
        }).required(),
    }),
};

homeValidator.postHomeImage = {
    [Segments.BODY]: Joi.object().keys({
        // file: Joi.string().required(),
        imgPlace: Joi.string().valid("carousel", "whoWeAre", "products").required(),
        imgSrc: Joi.string().required(),
        imgAlt: Joi.string().required(),
    }),
};

homeValidator.getHomeImage = {
    [Segments.QUERY]: Joi.object().keys({
        img_place: Joi.string().valid("carousel", "whoWeAre", "products").required(),
    }),
};

homeValidator.deleteHomeImage = {
    [Segments.PARAMS]: Joi.object().keys({
        image_id: Joi.string().required()
    }),
};

module.exports = homeValidator;
