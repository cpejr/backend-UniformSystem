const connection = require("../database/connection");

module.exports = {

    async createOne(newShirtModel, shirt_id){
        try{
            // await connection("shirt").where('shirt_id', shirt_id).select('*');
            const newModel = {
                ...newShirtModel,
                shirt_id,
            };
            console.log(newModel);
            const response = await connection("shirt_model").insert(newModel);
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

    async findShirtModelId(shirt_model_id){
        try{
            const response = await connection('shirt_model').select('shirt_model_id')
            .where('shirt_model_id',shirt_model_id);
            return response[0].shirt_model_id;
        }catch(err){
            throw new Error('Shirt Model Id not found.')
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

    async getByIdArray(idList, fields){

        const response = await connection("shirt_model")
            .whereIn('shirt_id', idList)
            .select(fields)
            
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