const express = require("express");

const usersRouter = require("./users");
const sessionRouter = require("./session");
const addressRouter = require("./address");
const productModelRouter = require("./productModel");
const productRouter = require("./product");
const productInCartRouter = require("./productInCart");

const routes = express.Router();

routes.use("/users", usersRouter);

routes.use("/session", sessionRouter);

routes.use("/address", addressRouter);
routes.use("/productmodels", productModelRouter);
routes.use("/product", productRouter);
routes.use("/productInCart", productInCartRouter);

module.exports = routes;
