const connection = require("../database/connection");
/* const { create } = require('../controllers/userController'); */
/* const { update, delete } = require('./ProductModel'); */
/* const { response } = require("express");  */

module.exports = {
  async create(newProdCart) {
    const response = await connection("product_in_cart").insert(newProdCart);
    return response;
  },

  async update(idProdCart, updatedFields) {
    const response = await connection("product_in_cart")
      .where("product_in_cart_id", idProdCart)
      .update(updatedFields);
    return response;
  },

  async delete(idProdCart) {
    const response = await connection("product_in_cart")
      .where("product_in_cart_id", idProdCart)
      .del();
    return response;
  },

  async getByUser(userId) {
    const response = await connection("product_in_cart")
      .join(
        "product_model",
        "product_model.product_model_id",
        "product_in_cart.product_model_id"
      )
      .join("product", "product.product_id", "product_model.product_id")
      .where("user_id", userId)
      .select(
        "product_in_cart.*",
        "product_model.price",
        "product_model.img_link",
        "product.name"
      );
    return response;
  },

  async getById(idProdCart, select = "*") {
    const response = await connection("product_in_cart")
      .where("product_in_cart_id", idProdCart)
      .select(select)
      .first();
    return response;
    err;
  },

  async deleteByUser(userId) {
    const response = await connection("product_in_cart")
      .where("user_id", userId)
      .del();
    return response;
  },
};
