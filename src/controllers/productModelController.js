const ProductModelModel = require("../models/ProductModelModel");
const ProductModel = require("../models/ProductModel");

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
          delete product_model.file;
    
          await ProductModelModel.createOne(product_model, existingProductId.product_id);
    
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
          const existingProductModelId = await ProductModelModel.findProductModelId(
            model_id
          );
          if(existingProductModelId===null || existingProductModelId === undefined) {
            res.status(404).json("Product model does not exist");
          }
          await ProductModelModel.delete(existingProductModelId);
          return res.status(200).json({
            message: "Modelo da camisa apagado com sucesso.",
          });
    
        } catch (err) {
          res.status(500).json("Internal server error.");
        }
    },

    async updateModel(req, res) {
        const { model_id } = req.params;
        const updated_fields = req.body;
        try {
          const existingProductModelId = await ProductModelModel.findProductModelId(
            model_id
          );
    
          await ProductModelModel.update(existingProductModelId, updated_fields);
          res
            .status(200)
            .json("Informações do modelo da camisa atualizadas com sucesso");
        } catch (err) {
          res.status(500).json("Internal server error.");
        }
    },

    async getProductModel(req, res) {
        const { product_id } = req.params;
        try {
          const existingProductId = await ProductModel.findProductId(product_id);
          if(existingProductId===undefined || existingProductId===null) {
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
}