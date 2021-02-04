const connection = require("../database/connection");

module.exports = {
  async createOne(newProductModel, product_id) {
      const newModel = {
        ...newProductModel,
        product_id,
        available: true
      };
      const response = await connection("product_model").insert(newModel);
      return response;
    },


  async createAll(productModels) {
      productModels.forEach(productModel=>{productModel.available = true})
      const response = await connection("product_model").insert(productModels);
      return response;
    },

  async findProductModelId(product_model_id) {
      const response = await connection("product_model")
        .select("product_model_id")
        .where({product_model_id: product_model_id});
      return response[0];
    },

  async getModelsByProductId(id) {
    const response = await connection("product_model")
      .where({product_id: id})
      .select("*");

    return response;
  },

  async getByIdArray(idList, fields = "*", filters) {
    let response;
    if(filters){
      response = await connection("product_model")
        .whereIn("product_model_id", idList)
        .where(filters)
        .select(fields);
    }
    else{
      response = await connection("product_model")
        .whereIn("product_model_id", idList)
        .select(fields);
    }
    return response;
  },

  async update(productModelId, updatedFields) {
    const response = await connection("product_model")
      .where({product_model_id: productModelId})
      .update(updatedFields);

    return response;
  },

  async delete(productModelId) {
    const response = await connection("product_model")
      .where({product_model_id: productModelId})
      .del();

    return response;
  },

};
