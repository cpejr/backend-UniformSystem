const connection = require("../database/connection");

module.exports = {

    async create(newShirt){

        try{
            const response = await connection("shirt").insert(newShirt);
            return response;
        }catch(err){
            console.log(err.message);
            return err;
        }
    },

    async findShirtId(shirt_id){
        try{
            const response = await connection('shirt').select('shirt_id')
            .where('shirt_id',shirt_id);
            return response[0].shirt_id;
        }catch(err){
            throw new Error('Shirt Id not found.')
        }
    },

    async getShirtsAndItsRespectiveMainModels(page = 1){

        const response = await connection('shirt').select('*')
        .join('shirt_model', 'shirt.shirt_id','shirt_model.shirt_id')
        .where({
            is_main: true,
        })
        .limit(process.env.ITENS_PER_PAGE)
        .offset((page - 1) * process.env.ITENS_PER_PAGE);

        const result = response.map(item => {

            return {
                shirt_id: item.shirt_id,
                name: item.name,
                description: item.description,
                product_type: item.product_type,
                models: {
                    shirt_model_id: item.shirt_model_id,
                    is_main: item.is_main,
                    img_link: item.img_link,
                    price: item.price,
                    model_description: item.model_description,
                    gender: item.gender,
                }
            }
        }); 

        return result;
    },

    async getAllShirtsCount(){
        const response = await connection('shirt').select().count("shirt.shirt_id as count")
        .join('shirt_model', 'shirt.shirt_id','shirt_model.shirt_id')
        .where({
            is_main: true,
        }).first();

        return response;
    },

    async getShirtsAndItsAllModels(shirt_id){

        const response = await connection('shirt')
        .select('*')
        .join('shirt_model', 'shirt.shirt_id','shirt_model.shirt_id')
        .where({
            'shirt.shirt_id': shirt_id,
        });

        // console.log(response);
        const result = {
            shirt_id: response[0].shirt_id,
            name: response[0].name,
            description: response[0].description,
            product_type: response[0].product_type,
            models: response.map(item => {
                return {
                    shirt_model_id: item.shirt_model_id,
                    is_main: item.is_main,
                    img_link: item.img_link,
                    price: item.price,
                    model_description: item.model_description,
                    gender: item.gender,
                }
            })
        }

        return result;
    },

    async update(shirtId, updatedFields){
        const response = await connection("shirt")
        .where('shirt_id', shirtId)
        .update(updatedFields);

        return response;
    },

    async delete(shirtId){
        const response = await connection("shirt")
        .where('shirt_id', shirtId)
        .del();
        
        return response;
    }

};