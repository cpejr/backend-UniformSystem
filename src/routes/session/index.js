const express = require('express');
const sessionRouter = express.Router();

const { celebrate } = require('celebrate');

const sessionValidator = require('../../validators/sessionValidator');
const SessionController = require ('../../controllers/SessionController');


sessionRouter.post('/login', celebrate(sessionValidator.signIn) , SessionController.signin);


module.exports = sessionRouter;