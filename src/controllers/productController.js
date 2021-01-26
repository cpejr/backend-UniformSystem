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
      res.status(500).json("Internal server error.");
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
      res.status(500).json("Internal server error.");
    }
  },

  async searchProductById(req, res) {
    try {
      const { product_id } = req.params;
      const product = await ProductModel.getProductById(product_id);

      res.status(200).json({
        product,
      });
    } catch (err) {
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

  async deleteProduct(req, res) {
    const { product_id } = req.params;
    try {
      const existingProductId = await ProductModel.findProductId(product_id);
      await ProductModel.delete(existingProductId);
      res.status(200).json({
        message: "Camisa apagada com sucesso.",
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async updateProduct(req, res) {
    const { product_id } = req.params;
    const { updated_fields } = req.body;
    try {
      const existingProductId = await ProductModel.findProductId(product_id);
      await ProductModel.update(existingProductId, updated_fields);
      return res.status(200).json("Informações da camisa atualizadas com sucesso");
    } catch (err) {
      console.warn(err);
      return res.status(500).json("Internal server error.");
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
};
