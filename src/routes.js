const express = require('express');
const routes = express.Router();
const { celebrate, Segments, Joi } = require('celebrate');

const userController = require ('./controllers/userController')
const productController = require ('./controllers/productController')
const cartController = require ('./controllers/cartController')
const orderController = require ('./controllers/orderController')

//importando validators
const userValidate = require('./validators/userValidator')
const addressValidate = require('./validators/addressValidator')
const cartValidate = require('./validators/cartValidator')

//Routes para o user
routes.post('/user', celebrate(userValidate.create),userController.createUser);
routes.delete('/delUserClient/:user_id', celebrate(userValidate.deleteClient),userController.deleteUserClient);
routes.delete('/delUserAdm/:user_id', celebrate(userValidate.deleteAdmin),userController.deleteUserAdm);
routes.put('/user/:user_id', celebrate(userValidate.update),userController.updateUser);
routes.get('/user', userController.allClients);
routes.get('/address/:user_id', userController.getAdresses);
routes.get('/adms', userController.allAdm);

routes.get('/address/:user_id', userController.getAdresses);
routes.post('/address/:user_id', celebrate(addressValidate.create),userController.addAddress);
routes.put('/address/:address_id', celebrate(addressValidate.update),userController.updateAddress);
routes.delete('/address/:address_id',celebrate(addressValidate.delete), userController.deleteAddress);

// Shirt
routes.post('/product', productController.createShirt);
routes.post('/newmodel/:shirt_id', productController.addShirtModel);

routes.get('/shirt', productController.allShirts);
routes.get('/shirtmodels/:shirt_id', productController.getShirtModel);

routes.delete('/shirt/:shirt_id', productController.deleteShirt);
routes.delete('/model/:model_id', productController.deleteModel);

routes.put('/shirt/:shirt_id', productController.updateShirt);
routes.put('/model/:model_id', productController.updateModel);


//ProductInCart
routes.get('/cart', cartController.getCart);
routes.put('/addcart', celebrate(cartValidate.addCart),cartController.addToCart);
routes.put('/cart', celebrate(cartValidate.updateCart),cartController.updateCart);
routes.delete('/cart', celebrate(cartValidate.removeFromCart),cartController.removeFromCart);
routes.delete('/emptycart', celebrate(cartValidate.emptyCart),cartController.emptyCart);


// Order Address Model
routes.post('/orderaddress', orderController.createOrderAddress);
routes.put('/orderaddress/:order_address_id', orderController.updateOrderAddress);
routes.delete('/orderaddress/:order_address_id', orderController.deleteOrderAddress);

// Order 
routes.post('/order', orderController.createOrder);
routes.put('/order/:order_id', orderController.updateOrder);
routes.delete('/order/:order_id', orderController.deleteOrder);
routes.get('/order/:user_id', orderController.getOrders);
routes.get('/userorder/:user_id', orderController.getUserOrder);
routes.get('/productsfromorder/:order_id', orderController.getProductsFromOrder);

module.exports = routes;