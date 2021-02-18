const express = require('express');
const homeRouter = express.Router();
const { celebrate } = require('celebrate');

const homeController = require ('../../controllers/homeController');
const homeValidator = require('../../validators/homeValidator');
const upload = require("../../utils/multer");

const { authenticateToken, isAdmin } = require('../../middlewares/authentication');

homeRouter.put(
    "/info",
    celebrate(homeValidator.update),
    authenticateToken,
    isAdmin,
    homeController.updateInfo
);

homeRouter.get(
    "/info",
    authenticateToken,
    isAdmin,
    homeController.readInfo
);

homeRouter.post(
    "/images",
    upload,
    celebrate(homeValidator.postHomeImage),
    authenticateToken,
    isAdmin,
    homeController.createImg
);

homeRouter.get(
    "/images",
    celebrate(homeValidator.getHomeImage),
    authenticateToken,
    isAdmin,
    homeController.downloadImg
);
homeRouter.delete(
    "/images/:image_id",
    celebrate(homeValidator.deleteHomeImage),
    authenticateToken,
    isAdmin,
    homeController.removeImg
);

module.exports = homeRouter;
