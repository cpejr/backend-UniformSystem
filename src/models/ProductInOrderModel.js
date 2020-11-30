const connection = require ('../database/connection');

module.exports = {
    async create(products){
        try {
            const response = await connection('product_in_order').insert(products);
            return response;
        } catch (error) {
            console.log(error.message);
            throw new Error('Falha na criação de produtos do pedido.');
        }
    },

    async getProductInOrderById(order_id){
        try {
            const response = await connection('product_in_order')
            .where({
                'order_id': order_id
            })
            .select('*');
            return response;
        } catch (error) {
            console.log(error.message);
            throw new Error('Falha na busca de produtos do pedido.');
        }
    },

    async delete(product_in_order_id){
        try {
            const response = await connection('product_in_order')
            .where('product_in_order_id', product_in_order_id)
            .del();
            return response;
        } catch (error) {
            console.log(error.message);
            throw new Error('Falha na exclusão de produtos do pedido.');
        }
    }
}