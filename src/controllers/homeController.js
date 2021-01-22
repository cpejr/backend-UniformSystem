const { v4: uuidv4 } = require("uuid");
const { uploadFile, deleteFile, dowloadFile } = require("../utils/bucket.js");
const AWS = require("../utils/bucket");

const HomeInfoModel = require("../models/HomeInfoModel");
const HomeImageModel = require("../models/HomeImageModel");

module.exports = {
  async updateInfo(req, res) {
    try {
      const { textWhoWeAre, textProducts, contactInfo } = req.body;

      const updatedFields = {
        textWhoWeAre,
        textProducts,
        ...contactInfo,
      };

      await HomeInfoModel.updateInfo(updatedFields);

      res.status(200).send({
        message: "Mudanças na Home Atualizadas",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  async readInfo(req, res) {
    try {
      const response = await HomeInfoModel.readInfo();

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        message: "Internal server Error",
      });

      return next(error);
    }
  },

  async createImg(req, res) {
    try {
      const newImage = {
        imgPlace: req.body.imgPlace,
        imgSrc: req.body.imgSrc,
        imgAlt: req.body.imgAlt,
      };

      if (req.file) {
        newImage.img_link = await AWS.uploadFile(req.file);
      } else {
        return res
          .status(404)
          .json({ message: "No image found in requisition" });
      }

      await HomeImageModel.createImage(newImage);

      res.status(200).json({
        message: "Imagem adicionada com sucesso!",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server Error",
      });
    }
  },

  async removeImg(req, res) {
    try {
      const { name, type } = req.query;
      await AWS.deleteFile(name, type);

      await HomeImageModel.deleteImage(`${name}.${type}`);

      res.status(200).send({
        message: "Imagem apagada.",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error.",
      });
    }
  },

  async downloadImg(req, res) {
    try {
      const { img_place } = req.query;
      const response = await HomeImageModel.readImage(img_place);

      res.status(200).json(response);

      // res.attachment(`${file}.${type}`);
      // res.status(200).send(resultDownload.Body);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};
