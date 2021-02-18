const express = require("express");

const addressRouter = require("./address");
const homeRouter = require("./home");
const productRouter = require("./product");
const cartRouter = require("./cart");
const productModelRouter = require("./productModel");
const sessionRouter = require("./session");
const usersRouter = require("./users");
const orderRouter = require("./order");

const routes = express.Router();

routes.use("/address", addressRouter);

routes.use("/home", homeRouter);

routes.use("/product", productRouter);

routes.use("/cart", cartRouter);

routes.use("/order", orderRouter);

routes.use("/productmodels", productModelRouter);

routes.use("/session", sessionRouter);

routes.use("/users", usersRouter);

module.exports = routes;
