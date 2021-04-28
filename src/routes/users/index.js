const express = require('express');
const usersRouter = express.Router();
const { celebrate } = require('celebrate');

const userController = require ('../../controllers/userController');
const userValidator = require('../../validators/userValidator');
const sessionValidator = require('../../validators/sessionValidator');

const { authenticateToken, isAdmin, authenticateOptionalToken } = require('../../middlewares/authentication');

//Criar usuario
usersRouter.post("/",
    celebrate(userValidator.create),
    authenticateOptionalToken,
    userController.createUser
);

// Deletar usuario
usersRouter.delete("/delClient/:user_id",
    celebrate(userValidator.deleteClient),
    authenticateToken,
    userController.deleteUserClient
);

usersRouter.delete("/delAdmOrEmployee/:user_id",
    celebrate(userValidator.deleteAdmin),
    authenticateToken,
    isAdmin,
    userController.deleteAdmOrEmployee
);

// Alterar Usuario
usersRouter.put("/:user_id",
    celebrate(userValidator.update),
    authenticateToken,
    userController.updateUser
);

// Buscar usuário
usersRouter.get("/",
    authenticateToken,
    isAdmin,
    userController.allClients
);

usersRouter.get("/employees",
    authenticateToken,
    isAdmin,
    userController.allEmployees
);

usersRouter.get("/employees/:user_id",
    authenticateToken,
    isAdmin,
    userController.searchUserById
);

usersRouter.post(
    "/sendpassword",
    celebrate(sessionValidator.forgetPassword),
    userController.forgetPassword
);

module.exports = usersRouter;
