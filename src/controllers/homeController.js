require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { uploadFile, deleteFile, dowloadFile } = require('../utils/bucket.js');

const HomeInfoModel = require("../models/HomeInfoModel");
const HomeImageModel = require("../models/HomeImageModel");

module.exports ={

  async updateInfo(req, res) {
    try {

      const { textWhoWeAre, textProducts, contactInfo } = req.body;

      const updatedFields = {
        textWhoWeAre, 
        textProducts, 
        ...contactInfo
      }
  

      await HomeInfoModel.updateInfo(
          updatedFields
      );
  
      res.status(200).send({
        message: 'Mudanças na Home Atualizadas'
      });
  
    } catch (error) {
      console.log(error.message);
          
      res.status(500).json({
      message: error.message
      });
    }
  },
  
  async readInfo(req, res){
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
  
  async createImg(req, res){
      try {
          // const { file } = req;
  
          const { img_link, imgPlace, imgSrc, imgAlt } = req.body;
  
          const newImage = {
            image_id: img_link,
            imgPlace, 
            imgSrc,
            imgAlt
          }

          await HomeImageModel.createImage(newImage)
  
          res.status(200).json({
            message: 'Imagem adicionada com sucesso!'
          });
  
      } catch (error) {
          
        return res.status(500).json({
              message: "Internal server Error",
          });
      }
  },
  
  async removeImg(req, res){
      try {

        // lembrando que name (do bucketController) == img_id
        // porém um é passado por query e outro é por params
          const { name } = req.query;

          await HomeImageModel.deleteImage(name)
  
          res.status(200).send({
            message: "Imagem apagada."
          });
  
      } catch (error) {
  
          console.log(error.message);
          
          res.status(500).json({
            message: "Internal server error."
          });
  
      }
  },
  
  async downloadImg(req, res){
      try {
        const { img_place } = req.query;
        const response = await HomeImageModel.readImage(img_place);
  
        res.status(200).json(response);
    
        // res.attachment(`${file}.${type}`);
        // res.status(200).send(resultDownload.Body);
    
      } catch (error) {
          console.log(error.message);
              
          res.status(500).json({
            message: error.message
          });
      }
    }
}

