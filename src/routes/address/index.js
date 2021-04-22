const express = require("express");
const addressRouter = express.Router();
const { celebrate } = require("celebrate");

const userController = require("../../controllers/userController");
const addressValidator = require("../../validators/addressValidator");

const { authenticateToken } = require("../../middlewares/authentication");

addressRouter.get("/:user_id", authenticateToken, userController.getAdresses);

addressRouter.post(
  "/:user_id",
  celebrate(addressValidator.create),
  authenticateToken,
  userController.addAddress
);

addressRouter.put(
  "/:address_id",
  celebrate(addressValidator.update),
  authenticateToken,
  userController.updateAddress
);

addressRouter.delete(
  "/:address_id",
  celebrate(addressValidator.delete),
  authenticateToken,
  userController.deleteAddress
);

module.exports = addressRouter;
