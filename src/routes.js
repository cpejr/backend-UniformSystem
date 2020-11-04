const express = require('express');
const routes = express.Router();
const { celebrate, Segments, Joi } = require('celebrate');

const userController = require ('./controllers/userController')
const productController = require ('./controllers/productController')
const cartController = require ('./controllers/cartController')
const orderController = require ('./controllers/orderController')
const SessionController = require ('./controllers/SessionController')

//importando validators
const userValidate = require('./validators/userValidator')
const addressValidate = require('./validators/addressValidator')
const cartValidate = require('./validators/cartValidator')
const orderValidate = require('./validators/orderValidator')
const productValidate = require('./validators/productValidator')


const upload = require('./utils/multer');
const  bucketController = require('./controllers/bucketController');


const { authenticateToken, isAdmin, isAdminOrEmployee, authenticateOptionalToken } = require('./middlewares/authentication');

//Routes para o user
routes.post('/user', celebrate(userValidate.create), authenticateOptionalToken, userController.createUser);
routes.delete('/delUserClient/:user_id', celebrate(userValidate.deleteClient), authenticateToken, userController.deleteUserClient);
routes.delete('/delAdmOrEmployee/:user_id', celebrate(userValidate.deleteAdmin), authenticateToken, isAdmin, userController.deleteAdmOrEmployee);
routes.put('/user/:user_id', celebrate(userValidate.update), authenticateToken, userController.updateUser);

routes.get('/user', authenticateToken, isAdmin, userController.allClients);
routes.get('/adms', authenticateToken, isAdmin, userController.allAdm);


routes.get('/address/:user_id', authenticateToken, userController.getAdresses);
routes.post('/address', celebrate(addressValidate.create), authenticateToken, userController.addAddress);
routes.put('/address/:address_id', celebrate(addressValidate.update), authenticateToken, userController.updateAddress);
routes.delete('/address/:address_id',celebrate(addressValidate.delete), authenticateToken, userController.deleteAddress);


// Product
routes.post('/product', celebrate(productValidate.createProduct), authenticateToken, isAdmin,productController.createProduct);
routes.post('/newmodel/:product_id',celebrate(productValidate.addProductModel), productController.addProductModel);
routes.post('/product', authenticateToken, isAdmin, productController.createProduct);
routes.post('/newmodel/:product_id', authenticateToken, isAdmin, productController.addProductModel);

routes.get('/product', productController.allProducts);
routes.get('/productmodels/:product_id',celebrate(productValidate.getProductModel), productController.getProductModel);

routes.delete('/product/:product_id', celebrate(productValidate.deleteProduct), authenticateToken, isAdmin, productController.deleteProduct);
routes.delete('/model/:model_id', celebrate(productValidate.deleteModel), authenticateToken, isAdmin, productController.deleteModel);

routes.put('/product/:product_id',celebrate(productValidate.updateProduct), authenticateToken, isAdmin, productController.updateProduct);
routes.put('/model/:model_id', celebrate(productValidate.updateModel), authenticateToken, isAdmin, productController.updateModel);

//ProductInCart
routes.get('/cart', authenticateToken, cartController.getCart);
routes.put('/addtocart', celebrate(cartValidate.addToCart), authenticateToken, cartController.addToCart);
routes.put('/cart', celebrate(cartValidate.updateCart), authenticateToken, cartController.updateCart);
routes.delete('/cart', celebrate(cartValidate.removeFromCart), authenticateToken, cartController.removeFromCart);
routes.delete('/emptycart', celebrate(cartValidate.emptyCart), authenticateToken, cartController.emptyCart);


// Order Address Model
routes.post('/orderaddress',celebrate(orderValidate.createOrderAddress), authenticateToken, orderController.createOrderAddress);
routes.put('/orderaddress/:order_address_id', celebrate(orderValidate.updateOrderAddress), authenticateToken, orderController.updateOrderAddress);
routes.delete('/orderaddress/:order_address_id', celebrate(orderValidate.deleteOrderAddress), authenticateToken, orderController.deleteOrderAddress);


// Order 
routes.post('/order',celebrate(orderValidate.create), authenticateToken, orderController.createOrder);
routes.put('/order/:order_id', celebrate(orderValidate.update), authenticateToken, isAdminOrEmployee, orderController.updateOrder);
routes.delete('/order/:order_id', celebrate(orderValidate.delete), authenticateToken, orderController.deleteOrder);
routes.get('/order', celebrate(orderValidate.getOrders), authenticateToken, isAdminOrEmployee, orderController.getOrders);
routes.get('/userorder/:user_id', celebrate(orderValidate.getUserOrder), authenticateToken, orderController.getUserOrder);
routes.get('/productsfromorder/:order_id', celebrate(orderValidate.getProductsFromOrder), authenticateToken, orderController.getProductsFromOrder);

//Session
routes.post('/login', SessionController.signin);
routes.get('/verify', SessionController.verifyToken);

// AWS Connection
routes.post('/bucket/upload', upload, bucketController.upload);
routes.get('/bucket/download', bucketController.download);
routes.delete('/bucket/remove', bucketController.remove);

// Deliver At Mail
routes.post('/deliveratmail/:order_id', authenticateToken, isAdminOrEmployee, orderController.deliverAtMail)


module.exports = routes;