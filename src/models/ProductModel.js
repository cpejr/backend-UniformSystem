const connection = require("../database/connection");

module.exports = {

    async create(newProduct){

        try{
            const response = await connection("product").insert(newProduct);
            return response;
        }catch(err){
            console.log(err.message);
            return err;
        }
    },

    async findProductId(product_id){
        try{
            const response = await connection('product').select('product_id')
            .where('product_id',product_id);
            return response[0].product_id;
        }catch(err){
            throw new Error('Product Id not found.')
        }
    },

    async getProductsAndItsRespectiveMainModels(page = 1){

        const response = await connection('product').select('*')
        .join('product_model', 'product.product_id','product_model.product_id')
        .where({
            is_main: true,
        })
        .limit(process.env.ITENS_PER_PAGE)
        .offset((page - 1) * process.env.ITENS_PER_PAGE);

        const result = response.map(item => {

            return {
                product_id: item.product_id,
                name: item.name,
                description: item.description,
                product_type: item.product_type,
                models: {
                    product_model_id: item.product_model_id,
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

    async getAllProductsCount(){
        const response = await connection('product').select().count("product.product_id as count")
        .join('product_model', 'product.product_id','product_model.product_id')
        .where({
            is_main: true,
        }).first();

        return response;
    },

    async getProductsAndItsAllModels(product_id){

        const response = await connection('product')
        .select('*')
        .join('product_model', 'product.product_id','product_model.product_id')
        .where({
            'product.product_id': product_id,
        });

        // console.log(response);
        const result = {
            product_id: response[0].product_id,
            name: response[0].name,
            description: response[0].description,
            product_type: response[0].product_type,
            models: response.map(item => {
                return {
                    product_model_id: item.product_model_id,
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

    async update(productId, updatedFields){
        const response = await connection("product")
        .where('product_id', productId)
        .update(updatedFields);

        return response;
    },

    async delete(productId){
        const response = await connection("product")
        .where('product_id', productId)
        .del();
        
        return response;
    }

};