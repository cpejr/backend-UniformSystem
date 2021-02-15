const express = require("express");
const orderRouter = express.Router();
const { celebrate } = require("celebrate");

const orderController = require("../../controllers/orderController");
const orderValidator = require("../../validators/orderValidator");

const { authenticateToken } = require("../../middlewares/authentication");

routes.post(
  "/order",
  celebrate(orderValidator.create),
  authenticateToken,
  orderController.createOrder
);
routes.put(
  "/order/:order_id",
  celebrate(orderValidator.update),
  authenticateToken,
  isAdminOrEmployee,
  orderController.updateOrder
);
routes.delete(
  "/order/:order_id",
  celebrate(orderValidator.delete),
  authenticateToken,
  orderController.deleteOrder
);
routes.get(
  "/order",
  celebrate(orderValidator.getOrders),
  authenticateToken,
  isAdminOrEmployee,
  orderController.getOrders
);
routes.get(
  "/order/userorder/:user_id",
  celebrate(orderValidator.getUserOrder),
  authenticateToken,
  orderController.getUserOrder
);
routes.get(
  "/order/productsfromorder/:order_id",
  celebrate(orderValidator.getProductsFromOrder),
  authenticateToken,
  orderController.getProductsFromOrder
);
routes.get(
  "/order/shipping/:zip",
  celebrate(orderValidator.getShipping),
  orderController.getShipping
);
routes.get(
  "/order/shipping/deliveredby/:user_id",
  authenticateToken,
  orderController.getOrderData
);
routes.post(
  "/order/deliveratmail/:order_id",
  authenticateToken,
  isAdminOrEmployee,
  orderController.deliverAtMail
);

module.exports = orderRouter;
