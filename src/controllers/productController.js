const ShirtModel = require("../models/ShirtModel");
const ShirtModelModel = require("../models/ShirtModelModel");

module.exports = {
  async createShirt(req, res) {
    const shirt = {
      name: req.body.name,
      description: req.body.description,
      product_type: req.body.product_type,
    };

    const models = req.body.models;
    try {
      await ShirtModel.create(shirt);

      await models.forEach((model) => {
        model.shirt_id = createdShirtId;
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

  async addShirtModel(req, res){
    const shirtModel = req.body;
    try{
      await ShirtModelModel.createOne(shirtModel);
      res.status(200).json({
        message: "Modelo adicionado com sucesso.",
      })    
    } catch (err){
      console.log(err.message);
      res.status(500).json("Internal server error.")
    }

  },

  async allShirts(){

  },

  async getShirtModel(){

  },

  async deleteShirt(req, res){
    const {shirt_id} = req.params;
    try{
      await ShirtModel.delete(shirt_id);
      res.status(200).json({
        message: "Camisa apagada com sucesso."
      });
    } catch (err){
        console.log(err.message);
        res.status(500).json("Internal server error.")
    }
  },

  async deleteModel(req, res){
    const {model_id} = req.params;
    try{
      await ShirtModelModel.delete(model_id);
      res.status(200).json({
        message: "Modelo da camisa apagado com sucesso."
      });
    } catch (err){
        console.log(err.message);
        res.status(500).json("Internal server error.")
    }
  },

  async updateShirt(req, res){
    const {shirt_id, updated_fields} = req.body;
    try{
      await ShirtModel.update(shirt_id, updated_fields);
      res.status(200).json("Informações da camisa atualizadas com sucesso");
    } catch (err){
        console.log(err.message);
        res.status(500).json("Internal server error.");
    }
  },

  async updateModel(req, res){
    const {model_id, updated_fields} = req.body;
    try{
      await ShirtModelModel.update(model_id, updated_fields);
      res.status(200).json("Informações do modelo da camisa atualizadas com sucesso");
    } catch (err){
        console.log(err.message);
        res.status(500).json("Internal server error.");
    }
  }  

};
