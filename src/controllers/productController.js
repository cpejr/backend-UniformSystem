const { response } = require("express");
const { getAllProductsCount } = require("../models/ProductModel");
const ProductModel = require("../models/ProductModel");
const ProductModelModel = require("../models/ProductModelModel");

module.exports = {
  async createProduct(req, res) {
    try {
      const product = {
        name: req.body.name,
        description: req.body.description,
        product_type: req.body.product_type,
      };

      const models = req.body.models;

      const createdProductId = await ProductModel.create(product);

      await models.forEach((model) => {
        model.product_id = createdProductId[0];
      });

      await ProductModelModel.createAll(models);

      res.status(200).json({
        message: "Camisa criada com sucesso!",
        product_id: createdProductId[0],
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).json("Internal server error.");
    }
  },

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
      console.log("antes");
      console.log(product_model);
      console.log("depois");
      console.log(product_model);
      delete product_model.file;

      await ProductModelModel.createOne(product_model, existingProductId);

      res.status(200).json({
        message: "Model criado com sucesso!",
      });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({
        message: err.message,
      });
    }
  },

  async searchProducts(req, res) {
    try {
      const { page, gender, name, product_type } = req.query;
      const products = await ProductModel.getProductsAndItsRespectiveMainModels(
        {
          page,
          gender,
          name,
          product_type, /*acresceitei isso aqui*/
        }
      );
      const { count } = await ProductModel.getAllProductsCount();

      const totalPages = Math.ceil(count / process.env.ITENS_PER_PAGE);

      res.setHeader("X-Total-Count", totalPages);
      res.status(200).json({
        products,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json("Internal server error.");
    }
  },

  async allModels(req, res) {
    try {
      const query = req.query;
      if (query.product_type)
        query.product_type = query.product_type.split(",");

      const models = await ProductModel.getAllModels(req.query);
      res.status(200).json({
        models,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json("Internal server error.");
    }
  },

  async getAllProductsCounted(req, res) {
    try {
      const count = await ProductModel.getAllProductsCount();
      const totalPages = count / process.env.ITENS_PER_PAGE;

      res.setHeader("X-Total-Count", totalPages);
    } catch (err) {}
  },

  async getProductModel(req, res) {
    const { product_id } = req.params;
    try {
      const existingProductId = await ProductModel.findProductId(product_id);

      const productFound = await ProductModel.getProductsAndItsAllModels(
        existingProductId
      );

      res.status(200).json(productFound);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.message,
      });
    }
  },

  async deleteProduct(req, res) {
    const { product_id } = req.params;
    try {
      const existingProductId = await ProductModel.findProductId(product_id);
      await ProductModel.delete(existingProductId);
      res.status(200).json({
        message: "Camisa apagada com sucesso.",
      });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ message: err.message });
    }
  },

  async deleteModel(req, res) {
    const { model_id } = req.params;
    try {
      const existingProductModelId = await ProductModelModel.findProductModelId(
        model_id
      );

      await ProductModelModel.delete(existingProductModelId);
      return res.status(200).json({
        message: "Modelo da camisa apagado com sucesso.",
      });

    } catch (err) {
      console.log(err.message);
      res.status(500).json("Internal server error.");
    }
  },

  async updateProduct(req, res) {
    const { product_id } = req.params;
    const { updated_fields } = req.body;
    try {
      const existingProductId = await ProductModel.findProductId(product_id);
      await ProductModel.update(existingProductId, updated_fields);
      res.status(200).json("Informações da camisa atualizadas com sucesso");
    } catch (err) {
      console.log(err.message);
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
      console.log(err.message);
      res.status(500).json("Internal server error.");
    }
  },
};
