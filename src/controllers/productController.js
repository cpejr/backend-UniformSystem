const ShirtModel = require("../models/ShirtModel");
const ShirtModelModel = require("../models/ShirtModelModel");

module.exports = {
  
  async createShirt(req, res) {
    try {
      const shirt = {
        name: req.body.name,
        description: req.body.description,
        product_type: req.body.product_type,
      };
  
      const models = req.body.models;

      const createdShirtId = await ShirtModel.create(shirt);

      await models.forEach((model) => {
        model.shirt_id = createdShirtId[0];
      });

      await ShirtModelModel.createAll(models);

      res.status(200).json({
        message: "Camisa criada com sucesso!",
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).json("Internal server error.");
    }
  },

  async addShirtModel(req, res) {
    try {
      const { shirt_id } = req.params;
      const shirt_model = req.body;
      
      const existingShirtId = await ShirtModel.findShirtId(shirt_id);

      await ShirtModelModel.createOne(shirt_model, existingShirtId);

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

  async allShirts(req, res) {
    try {
      const shirts = await ShirtModel.getShirtsAndItsRespectiveMainModels();

      res.status(200).json({
        shirts,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json("Internal server error.");
    }
  },

  async getShirtModel(req, res) {
    const { shirt_id } = req.params;
    try {
      const existingShirtId = await ShirtModel.findShirtId(shirt_id);

      const shirtFound = await ShirtModel.getShirtsAndItsAllModels(
        existingShirtId
      );

      res.status(200).json(shirtFound);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.message,
      });
    }
  },

  async deleteShirt(req, res) {
    const { shirt_id } = req.params;
    try {
      const existingShirtId = await ShirtModel.findShirtId(shirt_id);
      await ShirtModel.delete(existingShirtId);
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
      const existingShirtModelId = await ShirtModelModel.findShirtModelId(
        model_id
      );

      await ShirtModelModel.delete(existingShirtModelId);
      res.status(200).json({
        message: "Modelo da camisa apagado com sucesso.",
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).json("Internal server error.");
    }
  },

  async updateShirt(req, res) {
    const { shirt_id } = req.params;
    const { updated_fields } = req.body;
    try {
      const existingShirtId = await ShirtModel.findShirtId(shirt_id);
      await ShirtModel.update(existingShirtId, updated_fields);
      res.status(200).json("Informações da camisa atualizadas com sucesso");
    } catch (err) {
      console.log(err.message);
      res.status(500).json("Internal server error.");
    }
  },

  async updateModel(req, res) {
    const { model_id } = req.params;
    const { updated_fields } = req.body;
    try {
      const existingShirtModelId = await ShirtModelModel.findShirtModelId(
        model_id
      );

      await ShirtModelModel.update(existingShirtModelId, updated_fields);
      res
        .status(200)
        .json("Informações do modelo da camisa atualizadas com sucesso");
    } catch (err) {
      console.log(err.message);
      res.status(500).json("Internal server error.");
    }
  },
  
};
