const express = require('express');
const routes = express.Router();

const userController = require ('./controllers/userController')
const productController = require ('./controllers/productController')
const cartController = require ('./controllers/cartController')

routes.post('/user', userController.createUser);
routes.get('/user', userController.allClients);
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


module.exports = routes;