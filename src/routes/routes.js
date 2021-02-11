const express = require("express");
const routes = express.Router();
const { celebrate } = require("celebrate");

// const userController = require ('../controllers/userController')
const productController = require("../controllers/productController");
const cartController = require("../controllers/cartController");
const orderController = require("../controllers/orderController");
const SessionController = require("../controllers/SessionController");
const homeController = require("../controllers/homeController");
const productModelController = require("../controllers/productModelController");

//importando validators
// const userValidator = require('../validators/userValidator')
const addressValidator = require("../validators/addressValidator");
const cartValidator = require("../validators/cartValidator");
const orderValidator = require("../validators/orderValidator");
const productValidator = require("../validators/productValidator");
const homeValidator = require("../validators/homeValidator");
const sessionValidator = require("../validators/sessionValidator");

const upload = require("../utils/multer");

const {
  authenticateToken,
  isAdmin,
  isAdminOrEmployee,
  authenticateOptionalToken,
} = require("../middlewares/authentication");

//Routes para o user
// routes.post('/user', celebrate(userValidator.create), authenticateOptionalToken, userController.createUser);
// routes.delete('/delUserClient/:user_id', celebrate(userValidator.deleteClient), authenticateToken, userController.deleteUserClient);
// routes.delete('/delAdmOrEmployee/:user_id', celebrate(userValidator.deleteAdmin), authenticateToken, isAdmin, userController.deleteAdmOrEmployee);
// routes.put('/user/:user_id', celebrate(userValidator.update), authenticateToken, userController.updateUser);

// routes.get('/user', authenticateToken, isAdmin, userController.allClients);
// routes.get('/employees', authenticateToken, isAdmin, userController.allEmployees);
// routes.get('/employees/:user_id', authenticateToken, isAdmin, userController.searchUserById);

//Address - Bryan
// routes.get('/address/:user_id', authenticateToken, userController.getAdresses);
// routes.post('/address/:user_id', celebrate(addressValidator.create), authenticateToken, userController.addAddress);
// routes.put('/address/:address_id', celebrate(addressValidator.update), authenticateToken, userController.updateAddress);
// routes.delete('/address/:address_id',celebrate(addressValidator.delete), authenticateToken, userController.deleteAddress);

// Product - Hélio
routes.post(
  "/product",
  celebrate(productValidator.createProduct),
  authenticateToken,
  isAdmin,
  productController.createProduct
);

routes.get(
  "/product",
  celebrate(productValidator.searchProducts),
  productController.searchProducts
);
routes.get(
  "/product/:product_id",
  celebrate(productValidator.searchProductById),
  productController.searchProductById
);

routes.delete(
  "/product/:product_id",
  celebrate(productValidator.deleteProduct),
  authenticateToken,
  isAdmin,
  productController.deleteProduct
);

routes.put(
  "/product/:product_id",
  celebrate(productValidator.updateProduct),
  authenticateToken,
  isAdmin,
  productController.updateProduct
);

//Product Model - Bryan
// routes.post(
//   "/newmodel/:product_id",
//   authenticateToken,
//   isAdmin,
//   upload,
//   celebrate(productValidator.addProductModel),
//   productModelController.addProductModel
// );

// routes.get(
//   "/productmodels/:product_id",
//   celebrate(productValidator.getProductModel),
//   productModelController.getProductModel
// );
// routes.get(
//   "/productmodels",
//   celebrate(productValidator.allModels),
//   productController.allModels
// );

// routes.delete(
//   "/model/:model_id",
//   celebrate(productValidator.deleteModel),
//   authenticateToken,
//   isAdmin,
//   productModelController.deleteModel
// );

// routes.put(
//   "/model/:model_id",
//   authenticateToken,
//   isAdmin,
//   upload,
//   celebrate(productValidator.updateModel),
//   productModelController.updateModel
// );

//ProductInCart - João
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

// Order Address Model - Diogo
// routes.post('/orderaddress', celebrate(orderValidator.createOrderAddress), authenticateToken, orderController.createOrderAddress);
routes.put(
  "/orderaddress/:order_address_id",
  celebrate(orderValidator.updateOrderAddress),
  authenticateToken,
  orderController.updateOrderAddress
);
// routes.delete('/orderaddress/:order_address_id', celebrate(orderValidator.deleteOrderAddress), authenticateToken, orderController.deleteOrderAddress);

// Order - Felipe
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
  "/userorder/:user_id",
  celebrate(orderValidator.getUserOrder),
  authenticateToken,
  orderController.getUserOrder
);
routes.get(
  "/productsfromorder/:order_id",
  celebrate(orderValidator.getProductsFromOrder),
  authenticateToken,
  orderController.getProductsFromOrder
);
routes.get(
  "/shipping/:zip",
  celebrate(orderValidator.getShipping),
  orderController.getShipping
);
routes.get(
  "/shipping/deliveredby/:user_id",
  authenticateToken,
  orderController.getOrderData
);
routes.post(
  "/deliveratmail/:order_id",
  authenticateToken,
  isAdminOrEmployee,
  orderController.deliverAtMail
);

// Session - Izabela
// routes.post('/login', celebrate(sessionValidator.signIn) , SessionController.signin);
routes.get("/verify", SessionController.verifyToken);
routes.post(
  "/sendpassword",
  celebrate(sessionValidator.forgetPassword),
  userController.forgetPassword
);

// Home - Raphael ou Izabela
routes.put(
  "/home/info",
  celebrate(homeValidator.update),
  homeController.updateInfo
);
routes.get("/home/info", homeController.readInfo);

routes.post(
  "/home/images",
  upload,
  celebrate(homeValidator.postHomeImage),
  homeController.createImg
);

routes.get(
  "/home/images",
  celebrate(homeValidator.getHomeImage),
  homeController.downloadImg
);
routes.delete(
  "/home/images/:image_id",
  celebrate(homeValidator.deleteHomeImage),
  homeController.removeImg
);

module.exports = routes;
