const connection = require("../database/connection");

module.exports = {
  async create(products) {
    const response = await connection("product_in_order").insert(products);
    return response;
  },

  async getProductInOrderById(order_id) {
    const response = await connection("product_in_order")
      .where({
        order_id: order_id,
      })
      .select("*");
    return response;
  },

  async delete(product_in_order_id) {
    const response = await connection("product_in_order")
      .where("product_in_order_id", product_in_order_id)
      .del();
    return response;
  },
};
