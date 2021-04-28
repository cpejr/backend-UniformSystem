const express = require("express");
const productModelRouter = express.Router();
const { celebrate } = require("celebrate");

const productController = require("../../controllers/productController");
const productModelController = require("../../controllers/productModelController");
const productValidator = require("../../validators/productValidator");

const upload = require("../../utils/multer");

const {
  authenticateToken,
  isAdmin,
} = require("../../middlewares/authentication");

productModelRouter.post(
  "/newmodel/:product_id",
  authenticateToken,
  isAdmin,
  upload,
  celebrate(productValidator.addProductModel),
  productModelController.addProductModel
);

productModelRouter.get(
  "/:product_id",
  celebrate(productValidator.getProductModel),
  productModelController.getProductModel
);

productModelRouter.get(
  "/",
  celebrate(productValidator.allModels),
  productController.allModels
);

productModelRouter.delete(
  "/model/:model_id",
  celebrate(productValidator.deleteModel),
  authenticateToken,
  isAdmin,
  productModelController.deleteModel
);

productModelRouter.put(
  "/model/:model_id",
  authenticateToken,
  isAdmin,
  upload,
  celebrate(productValidator.updateModel),
  productModelController.updateModel
);

module.exports = productModelRouter;
