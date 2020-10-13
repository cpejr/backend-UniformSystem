const connection = require ('../database/connection');

module.exports = {
    async create(order_address){
        try {
            const response = await connection('order_address').insert(order_address);
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },

    async update(order_address_id, updated_order_address){ 
        try {
            const response = await connection('order_address')
            .where('order_address_id', order_address_id)
            .update(updated_order_address);
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },
    async delete(order_address_id){
        try {
            const response = await connection('order_address')
            .where('order_address_id', order_address_id)
            .del();
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }
}