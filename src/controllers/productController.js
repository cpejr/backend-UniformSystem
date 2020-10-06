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
      res.sendStatus(500).json("Internal server error.");
    }
  },

  addShortModel(){
    
  },
};
