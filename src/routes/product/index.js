const express = require("express");
const productRouter = express.Router();
const { celebrate } = require("celebrate");

const productController = require("../../controllers/productController");
const productValidator = require("../../validators/productValidator");


const {
    authenticateToken,
    isAdmin,
} = require("../../middlewares/authentication");

productRouter.post(
    "/",
    celebrate(productValidator.createProduct),
    authenticateToken,
    isAdmin,
    productController.createProduct
);

productRouter.get(
    "/",
    celebrate(productValidator.searchProducts),
    productController.searchProducts
);

productRouter.get(
    "/:product_id",
    celebrate(productValidator.searchProductById),
    productController.searchProductById
);

productRouter.delete(
    "/:product_id",
    celebrate(productValidator.deleteProduct),
    authenticateToken,
    isAdmin,
    productController.deleteProduct
);

productRouter.put(
    "/:product_id",
    celebrate(productValidator.updateProduct),
    authenticateToken,
    isAdmin,
    productController.updateProduct
);

module.exports = productRouter;