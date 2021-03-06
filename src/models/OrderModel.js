const connection = require("../database/connection");

const uuid = require("react-uuid");

module.exports = {
  async create(order) {
    order.order_id = uuid();

    await connection("order")
    .insert(order);

    return order.order_id;
  },

  async update(order_id, updated_order) {
    if (!("user_id" in updated_order) && !("created_at" in updated_order)) {
      const response = await connection("order")
        .where({
          order_id,
        })
        .update(updated_order);
      return response;
    }
  },

  // Model destinado à atualização da order pela Cielo
  async updateByCielo(order_id, updated_order) {
      const response = await connection("order")
        .where({
          order_id,
        })
        .update(updated_order);
      return response;
  },

  async delete(order_id) {
    const response = await connection("order")
      .where("order_id", order_id)
      .del();
    return response;
  },

  async getByFields(fields, returningFields = "*") {
    const response = await connection("order")
      .join(
        "shipping_data",
        "order.shipping_data_id",
        "shipping_data.shipping_data_id"
      )
      .where(fields)
      .select(returningFields);
    return response;
  },

  async updateShippingData(order_id, shipping_data) {
    const shippingDataID = await connection("shipping_data AS SD")
      .select("SD.shipping_data_id")
      .join("order AS O", "O.shipping_data_id", "SD.shipping_data_id")
      .where({
        order_id,
      })
      .first();

    const response = await connection("shipping_data AS SD")
      .where(shippingDataID)
      .update(shipping_data);
    return response;
  },
};
