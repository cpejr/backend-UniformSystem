const express = require("express")
const productInCartRouter = express.Router()
const { celebrate } = require("celebrate");

const cartController = require("../../controllers/cartController");    // Controller
const cartValidator = require("../../validators/cartValidator");       // Validator

const {authenticateToken} = require("../../middlewares/authentication")

routes.get("/cart", authenticateToken, cartController.getCart);

routes.put(
  "/addtocart",
  celebrate(cartValidator.addToCart),
  authenticateToken,
  cartController.addToCart
);
routes.put(
  "/cart/:product_in_cart_id",
  celebrate(cartValidator.updateCart),
  authenticateToken,
  cartController.updateCart
);
routes.delete(
  "/cart/:product_in_cart_id",
  celebrate(cartValidator.removeFromCart),
  authenticateToken,
  cartController.removeFromCart
);
routes.delete(
  "/emptycart",
  celebrate(cartValidator.emptyCart),
  authenticateToken,
  cartController.emptyCart
);

module.exports = productInCartRouter;