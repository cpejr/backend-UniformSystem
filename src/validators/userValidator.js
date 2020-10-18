const { Segments, Joi } = require('celebrate');

const userValidator = new Object();

userValidator.create = { //ok
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
        user_type: Joi.string().valid("client", "admin").required(),
        cpf: Joi.number().integer().required(),/* //length fala o tamanho que deve ter
        //não coloquei endereço pois o user pode ser um admin */
        address: Joi.object(),
    })
}

userValidator.update = { //ok
     [Segments.PARAMS]: Joi.object().keys({
        user_id: Joi.string().required(),
    }), 
    [Segments.BODY]: Joi.object().keys({
    updatedFields: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        cpf: Joi.number().integer().required(),
    })
    })
}

// Nos dois deletes abaixo o Id não necessariamente precisa ser de algum user.
//Não há metodos de verificar se o Id a ser apagado é relamente de um user/admin.
//isso é ok?
userValidator.deleteAdmin = { //ok??
    [Segments.PARAMS]: Joi.object().keys({
        user_id: Joi.string().required(),
    })
}

userValidator.deleteClient = { //ok??
    [Segments.PARAMS]: Joi.object().keys({
        user_id: Joi.string().required(),
    })
}

//Vou por os validators para endereço aqui tbm


module.exports = userValidator;