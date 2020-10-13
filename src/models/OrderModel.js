const connection = require ('../database/connection');

module.exports = {
    async create(order){
        try {
            const response = await connection('order').insert(order);
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },
    async update(order_id, updated_order){ 
        try {
            if( !('user_id' in updated_order) && !('created_at' in updated_order)){
                const response = await connection('order')
                .where('order_id', order_id)
                .update(updated_order);
                return response;
            }
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },

    async delete(order_id){
        try {
            const response = await connection('order')
            .where('order_id', order_id)
            .del();
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },

    async getByFields(fields, returningFields){
        try {
            const response = await connection('order')
            .join('order_address', 'order.order_address_id','order_address.order_address_id')
            .where(fields)
            .select(returningFields);
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },

}