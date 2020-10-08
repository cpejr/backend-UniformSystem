const express = require('express');
const routes = express.Router();

const userController = require ('./controllers/userController')
const productController = require ('./controllers/productController')

routes.post('/user', userController.create);

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