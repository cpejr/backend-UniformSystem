const connection = require("../database/connection");

module.exports = {
  async create(shipping_data) {
    const response = await connection("shipping_data").insert(shipping_data);
    return response;
  },

    async update(shipping_data_id, updated_shipping_data){ 
        try {
            const response = await connection('shipping_data')
            .where('shipping_data_id', shipping_data_id)
            .update(updated_shipping_data);
            return response;
        } catch (error) {
            console.log(error.message);
            throw new Error('Falha na atualização dos dados de frete.');
        }
    },

    async getByUser(userId) {
        const response = await connection("shipping_data")
          .join(
            "order",
            "shipping_data.shipping_data_id",
            "order.shipping_data_id"
          )
          .where("delivered_by", userId)
          .select(
            "order.*"
          );
        return response;
    },

    async delete(shipping_data_id){
        try {
            const response = await connection('shipping_data')
            .where('shipping_data_id', shipping_data_id)
            .del();
            return response;
        } catch (error) {
            console.log(error.message);
            throw new Error('Falha na exclusão dos dados de frete.');
        }
    }
}
