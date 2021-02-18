const express = require("express")
const cartRouter = express.Router()
const { celebrate } = require("celebrate");

const cartController = require("../../controllers/cartController");    // Controller
const cartValidator = require("../../validators/cartValidator");       // Validator

const {authenticateToken} = require("../../middlewares/authentication")

cartRouter.get("/", authenticateToken, cartController.getCart);

cartRouter.put(
  "/addtocart",
  celebrate(cartValidator.addToCart),
  authenticateToken,
  cartController.addToCart
);
cartRouter.put(
  "/:product_in_cart_id",
  celebrate(cartValidator.updateCart),
  authenticateToken,
  cartController.updateCart
);
cartRouter.delete(
  "/:product_in_cart_id",
  celebrate(cartValidator.removeFromCart),
  authenticateToken,
  cartController.removeFromCart
);
cartRouter.delete(
  "/emptycart",
  celebrate(cartValidator.emptyCart),
  authenticateToken,
  cartController.emptyCart
);

module.exports = cartRouter;