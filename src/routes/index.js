const express = require('express');

const usersRouter = require('./users');
const sessionRouter = require('./session');

const routes = express.Router();

routes.use('/users', usersRouter);

routes.use('/session', sessionRouter);


module.exports = routes;