const ProductModelModel = require("../models/ProductModelModel");
const ProductModel = require("../models/ProductModel");
const AWS = require("../utils/bucket");

module.exports = {
  async addProductModel(req, res) {
    try {
      const { product_id } = req.params;
      const product_model = req.body;

      const existingProductId = await ProductModel.findProductId(product_id);

      if (!existingProductId) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      if (product_model.file) {
        product_model.img_link = await AWS.uploadFile(product_model.file);
      } else {
        product_model.img_link = "Sem Imagem";
      }
      delete product_model.file;

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
    const { model_id } = req.params;
    try {
      const existingProductModel = await ProductModelModel.getByIdArray([
        model_id,
      ]);
      if (existingProductModel.length === 0) {
        res.status(404).json("Product model does not exist");
      }
      if (existingProductModel[0].img_link !== "Sem imagem") {
        const name = existingProductModel[0].img_link.slice(0, -4);
        const type = existingProductModel[0].img_link.slice(-3);
        await AWS.deleteFile(name, type);
      }
      await ProductModelModel.delete(model_id);
      return res.status(200).json({
        message: "Modelo da camisa apagado com sucesso.",
      });
    } catch (err) {
      console.warn(err);
      res.status(500).json("Internal server error.");
    }
  },

  async updateModel(req, res) {
    const { model_id } = req.params;
    const updated_fields = req.body;
    try {
      const existingProductModel = await ProductModelModel.getByIdArray([
        model_id,
      ]);
      if (!existingProductModel.length === 0) {
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
    const { product_id } = req.params;
    try {
      const existingProductId = await ProductModel.findProductId(product_id);
      if (existingProductId === undefined || existingProductId === null) {
        res.status(404).json({
          message: "This product does not exist",
        });
      }
      const productFound = await ProductModel.getProductsAndItsAllModels(
        existingProductId
      );

      return res.status(200).json(productFound);
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  },
};
