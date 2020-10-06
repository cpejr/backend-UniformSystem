const connection = require("../database/connection");

module.exports = {

    async createOne(newShirtModel){
        try{
            const response = await connection("shirt_model").insert(newShirtModel);
            return response;
        }catch(err){
            console.log(err.message);
            return err;
        }
    },

    async createAll(shirtModels){
        try{
            const response = await connection("shirt_model").insert(shirtModels);
            return response;
        }catch(err){
            console.log(err.message);
            return err;
        }
    },

    async getMainShirt(id){
        const response = await connection("shirt_model")
        .where({
            shirt_id: id,
            is_main: true,
        })
        .select('*');

        return response;
    },

    async getModelsByShirtId(id){
        const response = await connection("shirt_model")
        .where('shirt_id', id)
        .select('*');

        return response;
    },

    async update(shirtModelId, updatedFields){
        const response = await connection("shirt_model")
        .where('shirt_model_id', shirtModelId)
        .update(updatedFields);

        return response;
    },

    async delete(shirtModelId){
        const response = await connection("shirt_model")
        .where('shirt_model_id', shirtModelId)
        .del();
        
        return response;
    }

};