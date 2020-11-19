const connection = require("../database/connection");

module.exports = {

    async createOne(newProductModel, product_id){
        try{
            // await connection("product").where('product_id', product_id).select('*');
            const newModel = {
                ...newProductModel,
                product_id,
            };
            console.log(newModel);
            const response = await connection("product_model").insert(newModel);
            return response;
        }catch(err){
            console.log(err.message);
            throw new Error('Falha na criação do modelo do produto.');
        }
    },

    async createAll(productModels){
        try{
            const response = await connection("product_model").insert(productModels);
            return response;
        }catch(err){
            console.log(err.message);
            throw new Error('Falha na criação de todos os modelos do produto.');
        }
    },

    async findProductModelId(product_model_id){
        try{
            const response = await connection('product_model').select('product_model_id')
            .where('product_model_id',product_model_id);
            return response[0].product_model_id;
        }catch(err){
            throw new Error('Id do modelo do produto não encontrado.')
        }
    },

    async getMainProduct(id){

        try{
            const response = await connection("product_model")
            .where({
                product_id: id,
                is_main: true,
            })
            .select('*');
    
            return response;

        }catch(err){
            console.log(err.message);
            throw new Error('Falha na busca do modelo principal do produto.');
        }
    },

    async getModelsByProductId(id){

        try{
            const response = await connection("product_model")
            .where('product_id', id)
            .select('*');
    
            return response;

        }catch(err){
            console.log(err.message)
            throw new Error('Falha na busca do modelo do produto por ID.');
        }
    },

    async getByIdArray(idList, fields='*'){

        try{
            const response = await connection("product_model")
                .whereIn('product_model_id', idList)
                .select(fields)
                
            return response;

        }catch(err){
            console.log(err.message)
            throw new Error('Falha na busca dos modelos do produto por array de IDs.');
        }
    },

    async update(productModelId, updatedFields){

        try{
            const response = await connection("product_model")
            .where('product_model_id', productModelId)
            .update(updatedFields);
    
            return response;

        }catch(err){
            console.log(err.message)
            throw new Error('Falha na atualização do modelo do produto.');
        }
    },

    async delete(productModelId){

        try{
            const response = await connection("product_model")
            .where('product_model_id', productModelId)
            .del();
            
            return response;

        }catch(err){
            console.log(err.message)
            throw new Error('Falha na exclusão do modelo do produto.');
        }
    }

};