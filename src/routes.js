const express = require('express');
const routes = express.Router();
const { celebrate, Segments, Joi } = require('celebrate');

const userController = require ('./controllers/userController')
const productController = require ('./controllers/productController')
const cartController = require ('./controllers/cartController')
const orderController = require ('./controllers/orderController')
const SessionController = require ('./controllers/SessionController')

//importando validators
const userValidate = require('./validators/userValidator')
const addressValidate = require('./validators/addressValidator')
const cartValidate = require('./validators/cartValidator')
const orderValidate = require('./validators/orderValidator')
const productValidate = require('./validators/productValidator')

const { authenticateToken, isAdmin, authenticateOptionalToken } = require('./middlewares/authentication');

//Routes para o user
routes.post('/user', celebrate(userValidate.create), authenticateOptionalToken, userController.createUser);
routes.delete('/delUserClient/:user_id', celebrate(userValidate.deleteClient), authenticateToken, userController.deleteUserClient);
routes.delete('/delUserAdm/:user_id', celebrate(userValidate.deleteAdmin), authenticateToken, isAdmin, userController.deleteUserAdm);
routes.put('/user/:user_id', celebrate(userValidate.update), authenticateToken, userController.updateUser);
// routes.get('/user', userController.allClients);

routes.get('/user', authenticateToken, isAdmin, userController.allClients);
routes.get('/adms', authenticateToken, isAdmin, userController.allAdm);

// User
// routes.post('/user', authenticateOptionalToken, userController.createUser);


routes.get('/address/:user_id', authenticateToken, userController.getAdresses);
routes.post('/address/:user_id', celebrate(addressValidate.create), authenticateToken, userController.addAddress);
routes.put('/address/:address_id', celebrate(addressValidate.update), authenticateToken, userController.updateAddress);
routes.delete('/address/:address_id',celebrate(addressValidate.delete), authenticateToken, userController.deleteAddress);

// routes.get('/adms', authenticateToken, isAdmin, userController.allAdm);
// routes.delete('/delUserClient/:user_id', authenticateToken, userController.deleteUserClient);
// routes.delete('/delUserAdm/:user_id', authenticateToken, isAdmin, userController.deleteUserAdm);
// routes.put('/upUser/:user_id', authenticateToken, userController.updateUser);

// routes.get('/address/:user_id', authenticateToken, userController.getAdresses);
// routes.post('/addAddress/:user_id', authenticateToken, userController.addAddress);
// routes.put('/upAddress/:address_id', authenticateToken, userController.updateAddress);
// routes.delete('/delAddress/:address_id', authenticateToken, userController.deleteAddress);


// Shirt
routes.post('/product', celebrate(productValidate.createShirt),productController.createShirt);
routes.post('/newmodel/:shirt_id',celebrate(productValidate.addShirtModel), productController.addShirtModel);
routes.post('/product', authenticateToken, isAdmin, productController.createShirt);
routes.post('/newmodel/:shirt_id', authenticateToken, isAdmin, productController.addShirtModel);

routes.get('/shirt', productController.allShirts);
routes.get('/shirtmodels/:shirt_id',celebrate(productValidate.getShirtModel), productController.getShirtModel);

routes.delete('/shirt/:shirt_id', celebrate(productValidate.deleteShirt), authenticateToken, isAdmin, productController.deleteShirt);
routes.delete('/model/:model_id', celebrate(productValidate.deleteModel), authenticateToken, isAdmin, productController.deleteModel);

// routes.delete('/shirt/:shirt_id', authenticateToken, isAdmin, productController.deleteShirt);
// routes.delete('/model/:model_id', authenticateToken, isAdmin, productController.deleteModel);

routes.put('/shirt/:shirt_id',celebrate(productValidate.updateShirt), authenticateToken, isAdmin, productController.updateShirt);
routes.put('/model/:model_id', celebrate(productValidate.updateModel), authenticateToken, isAdmin, productController.updateModel);

// routes.put('/shirt/:shirt_id', authenticateToken, isAdmin, productController.updateShirt);
// routes.put('/model/:model_id', authenticateToken, isAdmin, productController.updateModel);


//ProductInCart
routes.get('/cart', authenticateToken, cartController.getCart);
routes.put('/addtocart', celebrate(cartValidate.addToCart),authenticateToken, cartController.addToCart);
routes.put('/cart', celebrate(cartValidate.updateCart),authenticateToken, cartController.updateCart);
routes.delete('/cart', celebrate(cartValidate.removeFromCart),authenticateToken, cartController.removeFromCart);
routes.delete('/emptycart', celebrate(cartValidate.emptyCart),authenticateToken, cartController.emptyCart);

// routes.get('/getcart', authenticateToken, cartController.getCart);
// routes.put('/addtocart', authenticateToken, cartController.addToCart);
// routes.put('/updatecart', authenticateToken, cartController.updateCart);
// routes.delete('/removefromcart', authenticateToken, cartController.removeFromCart);
// routes.delete('/emptycart', authenticateToken, cartController.emptyCart);


// Order Address Model
routes.post('/orderaddress',celebrate(orderValidate.createOrderAddress), authenticateToken, orderController.createOrderAddress);
routes.put('/orderaddress/:order_address_id', celebrate(orderValidate.updateOrderAddress), authenticateToken, orderController.updateOrderAddress);
routes.delete('/orderaddress/:order_address_id', celebrate(orderValidate.deleteOrderAddress), authenticateToken, orderController.deleteOrderAddress);

// routes.post('/orderaddress', authenticateToken, orderController.createOrderAddress);
// routes.put('/orderaddress/:order_address_id', authenticateToken, orderController.updateOrderAddress);
// routes.delete('/orderaddress/:order_address_id', authenticateToken, orderController.deleteOrderAddress);

// Order 
routes.post('/order',celebrate(orderValidate.create),  authenticateToken, orderController.createOrder);
routes.put('/order/:order_id', celebrate(orderValidate.update), authenticateToken, isAdmin, orderController.updateOrder);
routes.delete('/order/:order_id', celebrate(orderValidate.delete), authenticateToken, orderController.deleteOrder);
routes.get('/order/:user_id', celebrate(orderValidate.getOrders), authenticateToken, orderController.getOrders);
routes.get('/userorder/:user_id', celebrate(orderValidate.getUserOrder), authenticateToken, orderController.getUserOrder);
routes.get('/productsfromorder/:order_id', celebrate(orderValidate.getProductsFromOrder), authenticateToken, orderController.getProductsFromOrder);

// routes.post('/order', authenticateToken, orderController.createOrder);
// routes.put('/order/:order_id', authenticateToken, isAdmin, orderController.updateOrder);
// routes.delete('/order/:order_id', authenticateToken, orderController.deleteOrder);
// routes.get('/order/:user_id', authenticateToken, orderController.getOrders);
// routes.get('/userorder/:user_id', authenticateToken, orderController.getUserOrder);
// routes.get('/productsfromorder/:order_id', authenticateToken, orderController.getProductsFromOrder);

//Session
routes.post('/login', SessionController.signin);
routes.get('/verify', SessionController.verifyToken);

module.exports = routes;