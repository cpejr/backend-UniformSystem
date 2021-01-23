const { response } = require("express");
const connection = require("../database/connection");
const uuid = require("react-uuid");

module.exports = {
  async createImage(image) {
    const response = await connection("homeImages").insert(image);
    return response;
  },
  async readImage(imgPlace) {
    const response = await connection("homeImages")
      .where({ imgPlace: imgPlace })
      .select("*");
    return response;
  },
  async getById(image_id) {
    const response = await connection("homeImages")
      .where({ image_id })
      .select("*")
      .first();
    return response;
  },
  async deleteImage(image_id) {
    const response = await connection("homeImages")
      .where("image_id", image_id)
      .del();
    return response;
  },
};
