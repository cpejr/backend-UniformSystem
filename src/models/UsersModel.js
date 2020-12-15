/* const { create } = require('../controllers/userController'); */
const connection = require("../database/connection");

const uuid = require("react-uuid");

module.exports = {
  async create(user) {
    user.user_id = uuid();
    const response = await connection("users").insert(user);
    return user.user_id;
  },

  async read() {
    const response = await connection("user").select("*");
    return response;
  },

  async getAllByTypes(type) {
    const response = await connection("users")
      .where("user_type", type)
      .select("*");
    return response;
  },

  async getById(id) {
    const response = await connection("users").where("user_id", id).select("*");
    return response;
  },

  async getUserByUid(firebase_id) {
    const response = await connection("users")
      .where("firebase_uid", firebase_id)
      .select("*");
    return response;
  },

  async update(user_id, updated_user) {
    const response = await connection("users")
      .where("user_id", user_id)
      .update(updated_user);
    return response;
  },
  async delete(user_id) {
    const response = await connection("users").where("user_id", user_id).del();
    return response;
  },
};
