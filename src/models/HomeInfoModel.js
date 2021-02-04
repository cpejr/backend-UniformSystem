const { response } = require("express");
const connection = require("../database/connection");

const uuid = require("react-uuid");

module.exports = {
  async readInfo() {
    const response = await connection("homeInfo").select("key", "data");
    return response;
  },

  async updateInfo(updated_fields) {
    // verifica se existe
    const existeTabela = await connection("homeInfo")
      .where("key", Object.keys(updated_fields)[0])
      .select("*");

    if (existeTabela == "") {
      // updated_fields.homeInfo_id = uuid();
      var teste = updated_fields;
      Object.keys(teste).forEach(async function (item) {
        const result = {
          homeInfo_id: uuid(),
          key: item,
          data: "",
        };
        await connection("homeInfo").insert(result);
      });
    }

    Object.keys(updated_fields).forEach(async function (item) {
      await connection("homeInfo")
        .where("key", item)
        .update({ data: updated_fields[item] });
    });
  },
};
