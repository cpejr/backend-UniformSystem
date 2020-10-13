const express = require('express');
const routes = express.Router();

const userController = require ('./controllers/userController')
const productController = require ('./controllers/productController')

routes.post('/user', userController.createUser);

routes.get('/user', userController.allClients);

routes.get('/address/:user_id', userController.getAdresses);

routes.get('/adms', userController.allAdm);

routes.delete('/delUserClient/:user_id', userController.deleteUserClient);

routes.delete('/delUserAdm/:user_id', userController.deleteUserAdm);

routes.put('/upAddress/:address_id', userController.updateAddress);

routes.put('/upUser/:user_id', userController.updateUser);

routes.delete('/delAddress/:address_id', userController.deleteAddress);

routes.get('/allAddresses', userController.getAllAddresses)

routes.post('/addAddress/:user_id', userController.addAddress)

routes.get('/address', userController.getAdresses);

routes.get('/adms', userController.allAdm);

// routes.delete('/delUser', userController.deleteUser);

routes.put('/upAddress', userController.updateAddress);

routes.put('/upUser', userController.updateUser);

routes.delete('/delAddress', userController.deleteAddress);

// Shirt
routes.post('/product', productController.createShirt);
routes.post('/newmodel/:shirt_id', productController.addShirtModel);

routes.get('/shirt', productController.allShirts);
routes.get('/shirtmodels/:shirt_id', productController.getShirtModel);

routes.delete('/shirt/:shirt_id', productController.deleteShirt);
routes.delete('/model/:model_id', productController.deleteModel);

routes.put('/shirt/:shirt_id', productController.updateShirt);
routes.put('/model/:model_id', productController.updateModel);

module.exports = routes;