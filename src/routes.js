const express = require('express');
const routes = express.Router();

const userController= require ('./controllers/userController');

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

module.exports = routes;