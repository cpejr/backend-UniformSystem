const express = require('express');
const routes = express.Router();

const userController = require ('./controllers/userController')
const productController = require ('./controllers/productController')

routes.post('/user', userController.create);

// Shirt
routes.post('/product', productController.createShirt);

module.exports = routes;