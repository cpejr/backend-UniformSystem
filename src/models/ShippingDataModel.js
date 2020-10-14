const connection = require ('../database/connection');

module.exports = {
    async create(shipping_data){
        try {
            const response = await connection('shipping_data').insert(shipping_data);
            return response;
        }catch (error) {
            console.log(error.message);
            return error;
        }
    },

    async update(shipping_data_id, updated_shipping_data){ 
        try {
            const response = await connection('shipping_data')
            .where('shipping_data_id', shipping_data_id)
            .update(updated_shipping_data);
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },
    async delete(shipping_data_id){
        try {
            const response = await connection('shipping_data')
            .where('shipping_data_id', shipping_data_id)
            .del();
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }
}