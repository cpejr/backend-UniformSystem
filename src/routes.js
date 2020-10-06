const express = require('express');
const routes = express.Router();

const userController = require ('./controllers/userController')
const productController = require ('./controllers/productController')

routes.post('/user', userController.create);

// Shirt
routes.post('/product', productController.createShirt);
routes.post('/newmodel', productController.addShirtModel);
routes.delete('/shirt/:shirt_id', productController.deleteShirt);
routes.delete('/model/:model_id', productController.deleteModel);
routes.put('/shirt', productController.updateShirt);
routes.put('/model', productController.updateModel);

module.exports = routes;