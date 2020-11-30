const connection = require("../database/connection");

module.exports = {
  async createOne(newProductModel, product_id) {
    try {
      // await connection("product").where('product_id', product_id).select('*');
      const newModel = {
        ...newProductModel,
        product_id,
      };
      console.log(newModel);
      const response = await connection("product_model").insert(newModel);
      return response;
    } catch (err) {
      console.log(err.message);
      return err;
    }
  },


  async createAll(productModels) {
    try {
      const response = await connection("product_model").insert(productModels);
      return response;
    } catch (err) {
      console.log(err.message);
      return err;
    }
  },

  async findProductModelId(product_model_id) {
    try {
      const response = await connection("product_model")
        .select("product_model_id")
        .where("product_model_id", product_model_id);
      return response[0].product_model_id;
    } catch (err) {
      throw new Error("Product Model Id not found.");
    }
  },

  async getMainProduct(id) {
    const response = await connection("product_model")
      .where({
        product_id: id,
        is_main: true,
      })
      .select("*");

    return response;
  },

  async getModelsByProductId(id) {
    const response = await connection("product_model")
      .where("product_id", id)
      .select("*");

    return response;
  },

  async getByIdArray(idList, fields = "*") {
    console.log(fields);
    const response = await connection("product_model")
      .whereIn("product_model_id", idList)
      .select(fields);


    return response;
  },

  async update(productModelId, updatedFields) {
    const response = await connection("product_model")
      .where("product_model_id", productModelId)
      .update(updatedFields);

    return response;
  },

  async delete(productModelId) {
    const response = await connection("product_model")
      .where("product_model_id", productModelId)
      .del();

    return response;
  },
};
