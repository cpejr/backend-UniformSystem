const CieloController = require("./controllers/CieloController");

routes.post(
  "/cielonotification",
  celebrate(orderValidator.create),
  authenticateToken,
  orderController.createOrder
);

routes.post("/cielolink", CieloController.getLink);
