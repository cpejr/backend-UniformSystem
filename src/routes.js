const express = require('express');
const routes = express.Router();

const userController= require ('./controllers/userController');

routes.post('/user', userController.createUser);

routes.get('/user', userController.allClients);

routes.get('/address', userController.getAdresses);

routes.get('/adms', userController.allAdm);

routes.delete('/delUser', userController.deleteUser);

routes.put('/upAddress', userController.updateAddress);

routes.put('/upUser', userController.updateUser);

routes.delete('/delAddress', userController.deleteAddress);

module.exports = routes;