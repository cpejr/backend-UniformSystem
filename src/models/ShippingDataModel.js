const connection = require("../database/connection");

module.exports = {
  async create(shipping_data) {
    const response = await connection("shipping_data").insert(shipping_data);
    return response;
  },

  async update(shipping_data_id, updated_shipping_data) {
    const response = await connection("shipping_data")
      .where("shipping_data_id", shipping_data_id)
      .update(updated_shipping_data);
    return response;
  },
  async delete(shipping_data_id) {
    const response = await connection("shipping_data")
      .where("shipping_data_id", shipping_data_id)
      .del();
    return response;
  },
};
