const express = require("express");

const usersRouter = require("./users");
const sessionRouter = require("./session");
const addressRouter = require("./address");
const productModelRouter = require("./productModel");

const routes = express.Router();

routes.use("/users", usersRouter);

routes.use("/session", sessionRouter);

routes.use("/address", addressRouter);
routes.use("/productmodels", productModelRouter);

module.exports = routes;
