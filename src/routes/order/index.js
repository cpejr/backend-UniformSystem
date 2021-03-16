const express = require("express");
const orderRouter = express.Router();
const { celebrate } = require("celebrate");

const orderController = require("../../controllers/orderController");
const orderValidator = require("../../validators/orderValidator");

const {
  authenticateToken,
  isAdminOrEmployee,
} = require("../../middlewares/authentication");

orderRouter.post(
  "/",
  celebrate(orderValidator.create),
  authenticateToken,
  orderController.createOrder
);
orderRouter.put(
  "/:order_id",
  celebrate(orderValidator.update),
  authenticateToken,
  isAdminOrEmployee,
  orderController.updateOrder
);
orderRouter.delete(
  "/:order_id",
  celebrate(orderValidator.delete),
  authenticateToken,
  orderController.deleteOrder
);
orderRouter.get(
  "/",
  celebrate(orderValidator.getOrders),
  authenticateToken,
  isAdminOrEmployee,
  orderController.getOrders
);
orderRouter.get(
  "/userorder/:user_id",
  celebrate(orderValidator.getUserOrder),
  authenticateToken,
  orderController.getUserOrder
);
orderRouter.get(
  "/productsfromorder/:order_id",
  celebrate(orderValidator.getProductsFromOrder),
  authenticateToken,
  orderController.getProductsFromOrder
);
orderRouter.post(
  "/shippingQuote",
  celebrate(orderValidator.getShippingQuote),
  orderController.shippingQuote
);
orderRouter.get(
  "/shipping/deliveredby/:user_id",
  authenticateToken,
  orderController.getOrders
);
orderRouter.post(
  "/deliveratmail/:order_id",
  authenticateToken,
  isAdminOrEmployee,
  orderController.deliverAtMail
);

module.exports = orderRouter;
