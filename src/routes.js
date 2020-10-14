const express = require('express');
const routes = express.Router();

const userController = require ('./controllers/userController')
const productController = require ('./controllers/productController')
const cartController = require ('./controllers/cartController')
const orderController = require ('./controllers/orderController')

routes.post('/user', userController.createUser);
routes.get('/user', userController.allClients);

<<<<<<< HEAD
routes.get('/address/:user_id', userController.getAdresses);

routes.get('/adms', userController.allAdm);
routes.delete('/delUserClient/:user_id', userController.deleteUserClient);
routes.delete('/delUserAdm/:user_id', userController.deleteUserAdm);
routes.put('/upUser/:user_id', userController.updateUser);

routes.get('/address/:user_id', userController.getAdresses);
routes.post('/addAddress/:user_id', userController.addAddress);
routes.put('/upAddress/:address_id', userController.updateAddress);
routes.delete('/delAddress/:address_id', userController.deleteAddress);

//Apagar o essa rota
routes.get('/allAddresses', userController.getAllAddresses);

routes.post('/addAddress/:user_id', userController.addAddress)
=======
routes.get('/address', userController.getAdresses);

routes.get('/adms', userController.allAdm);

routes.delete('/delUser', userController.deleteUser);

routes.put('/upAddress', userController.updateAddress);

routes.put('/upUser', userController.updateUser);

routes.delete('/delAddress', userController.deleteAddress);
>>>>>>> users_controllers_models

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
routes.get('/getcart', cartController.getCart);
routes.put('/addtocart', cartController.addToCart);
routes.put('/updatecart', cartController.updateCart);
routes.delete('/removefromcart', cartController.removeFromCart);
routes.delete('/emptycart', cartController.emptyCart);


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