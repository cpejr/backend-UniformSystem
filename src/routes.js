const express = require('express');
const routes = express.Router();

const userController= require ('./controllers/userController');

routes.post('/user', userController.createUser);

routes.get('/user', userController.allClients);

routes.get('/adress', userController.getAdresses);

module.exports = routes;