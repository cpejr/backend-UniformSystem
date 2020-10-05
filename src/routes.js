const express = require('express');
const routes = express.Router();

const userController= require ('./controllers/userController')

routes.post('/user', userController.create);

module.exports = routes;