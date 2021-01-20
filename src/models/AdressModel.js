const { response } = require("express");
const connection = require("../database/connection");

module.exports = {
  async create(adress) {
    const response = await connection("address").insert(adress);
    return response;
  },
  async read() {
    const response = await connection("address").select("*");
    return response;
  },
  async getById(id) {
    const response = await connection("address")
      .where("address_id", id)
      .select("*")
      .first();
    return response;
  },
  async getAdressByUserId(user_id) {
    const response = await connection("address")
      .where("user_id", user_id)
      .select("*");
    return response;
  },
  async update(address_id, updated_fields) {
    await connection("address")
      .where("address_id", address_id)
      .update(updated_fields);
    return response;
  },
  async delete(address_id) {
    const response = await connection("address")
      .where("address_id", address_id)
      .del();
    return response;
  },
  async deleteByUserId(user_id) {
    const response = await connection("address")
      .where("user_id", user_id)
      .del();
    return response;
  },
};
