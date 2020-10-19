const express = require('express');
const routes = express.Router();

const userController = require ('./controllers/userController')
const productController = require ('./controllers/productController')
const cartController = require ('./controllers/cartController')
const orderController = require ('./controllers/orderController')
const SessionController = require ('./controllers/SessionController')

const { authenticateToken, isAdmin } = require('./middlewares/authentication');

// User
routes.post('/user', userController.createUser);
routes.get('/user', authenticateToken, isAdmin, userController.allClients);

routes.get('/address/:user_id', authenticateToken, userController.getAdresses);

routes.get('/adms', authenticateToken, isAdmin, userController.allAdm);
routes.delete('/delUserClient/:user_id', authenticateToken, userController.deleteUserClient);
routes.delete('/delUserAdm/:user_id', authenticateToken, isAdmin, userController.deleteUserAdm);
routes.put('/upUser/:user_id', authenticateToken, userController.updateUser);

routes.get('/address/:user_id', authenticateToken, userController.getAdresses);
routes.post('/addAddress/:user_id', authenticateToken, userController.addAddress);
routes.put('/upAddress/:address_id', authenticateToken, userController.updateAddress);
routes.delete('/delAddress/:address_id', authenticateToken, userController.deleteAddress);

//Apagar o essa rota
routes.get('/allAddresses', authenticateToken, userController.getAllAddresses);

routes.post('/addAddress/:user_id', authenticateToken, userController.addAddress)

// Shirt
routes.post('/product', authenticateToken, isAdmin, productController.createShirt);
routes.post('/newmodel/:shirt_id', authenticateToken, isAdmin, productController.addShirtModel);

routes.get('/shirt', authenticateToken, productController.allShirts);
routes.get('/shirtmodels/:shirt_id', authenticateToken, productController.getShirtModel);

routes.delete('/shirt/:shirt_id', authenticateToken, isAdmin, productController.deleteShirt);
routes.delete('/model/:model_id', authenticateToken, isAdmin, productController.deleteModel);

routes.put('/shirt/:shirt_id', authenticateToken, isAdmin, productController.updateShirt);
routes.put('/model/:model_id', authenticateToken, isAdmin, productController.updateModel);


//ProductInCart
routes.get('/getcart', authenticateToken, cartController.getCart);
routes.put('/addtocart', authenticateToken, cartController.addToCart);
routes.put('/updatecart', authenticateToken, cartController.updateCart);
routes.delete('/removefromcart', authenticateToken, cartController.removeFromCart);
routes.delete('/emptycart', authenticateToken, cartController.emptyCart);


// Order Address Model
routes.post('/orderaddress', authenticateToken, orderController.createOrderAddress);
routes.put('/orderaddress/:order_address_id', authenticateToken, orderController.updateOrderAddress);
routes.delete('/orderaddress/:order_address_id', authenticateToken, orderController.deleteOrderAddress);

// Order 
routes.post('/order', authenticateToken, orderController.createOrder);
routes.put('/order/:order_id', authenticateToken, isAdmin, orderController.updateOrder);
routes.delete('/order/:order_id', authenticateToken, orderController.deleteOrder);
routes.get('/order/:user_id', authenticateToken, orderController.getOrders);
routes.get('/userorder/:user_id', authenticateToken, orderController.getUserOrder);
routes.get('/productsfromorder/:order_id', authenticateToken, orderController.getProductsFromOrder);

//Session
routes.post('/login', SessionController.signin);
routes.get('/verify', SessionController.verifyToken);

module.exports = routes;