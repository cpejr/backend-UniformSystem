const ProductModelModel = require("../models/ProductModelModel");
const ProductModel = require("../models/ProductModel");
const AWS = require("../utils/bucket");

module.exports = {
  async addProductModel(req, res) {
    try {
      const { product_id } = req.params;
      const { file } = req;
      const product_model = req.body;

      const existingProductId = await ProductModel.findProductId(product_id);

      if (!existingProductId) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      if (file) {
        product_model.img_link = await AWS.uploadFile(file);
      } else {
        product_model.img_link = "Sem Imagem";
      }
      delete file;

      await ProductModelModel.createOne(
        product_model,
        existingProductId.product_id
      );

      res.status(200).json({
        message: "Model criado com sucesso!",
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  },

  async deleteModel(req, res) {
    try {
      const { model_id } = req.params;
      const existingProductModel = await ProductModelModel.getById(model_id);
      if (!existingProductModel) {
        return res.status(404).json("Product model does not exist");
      }
      if (existingProductModel.img_link !== "Sem imagem" && existingProductModel.img_link !== "...") {
        const name = existingProductModel.img_link.slice(0, -4);
        const type = existingProductModel.img_link.slice(-3);
        await AWS.deleteFile(name, type);
      }
      await ProductModelModel.delete(model_id);
      return res.status(200).json({
        message: "Modelo da camisa apagado com sucesso.",
      });
    } catch (err) {
      console.warn(err);
      return res.status(500).json("Internal server error.");
    }
  },

  async updateModel(req, res) {
    const { model_id } = req.params;
    const updated_fields = req.body;
    try {
      const existingProductModel = await ProductModelModel.getByIdArray([
        model_id,
      ]);
      console.log(
        "🚀 ~ file: productModelController.js ~ line 72 ~ updateModel ~ existingProductModel",
        existingProductModel
      );
      if (existingProductModel.length === 0) {
        return res.status(404).json({ message: "Model not found" });
      }
      if (req.file) {
        updated_fields.img_link = await AWS.uploadFile(
          req.file,
          existingProductModel[0].img_link
        );
      }
      await ProductModelModel.update(
        existingProductModel[0].product_model_id,
        updated_fields
      );
      return res
        .status(200)
        .json("Informações do modelo da camisa atualizadas com sucesso");
    } catch (err) {
      console.warn(err);
      res.status(500).json("Internal server error.");
    }
  },

  async getProductModel(req, res) {
    const search_product_id = req.params.product_id;
    const query = req.query;
    try {
      const { product_id } = await ProductModel.findProductId(
        search_product_id
      );

      if (product_id === undefined || product_id === null) {
        return res.status(404).json({
          message: "This product does not exist",
        });
      }
      let filters = {};
      Object.keys(query).forEach((key) => {
        filters[`product_model.${key}`] = query[key];
      });
      const productFound = await ProductModel.getProductsAndItsAllModels(
        product_id,
        filters
      );

      return res.status(200).json(productFound);
    } catch (err) {
      return res.status(400).json({
        message: "Internal Server error",
      });
    }
  },
};
