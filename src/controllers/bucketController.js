require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { uploadFile, deleteFile, dowloadFile } = require('../utils/bucket.js');

const ProductModelModel = require("../models/ProductModelModel");


const download = async (req, res, next) => {
  try {
    const {
      file,
      type,
    } = req.query;

    const resultDownload = await dowloadFile(file, type);

    res.attachment(`${file}.${type}`);
    res.status(200).send(resultDownload.Body);

  } catch (error) {
      console.log(error.message);
          
      res.status(500).json({
        message: error.message
      });
    // next({
    //   message: error.message,
    //   status: 500,
    // });
  }
};

const upload = async (req, res, next) => {
    try {
        const { file } = req;
        let buffer;
        let type;
        let newURL;

        if (file) {
            buffer = req.file.buffer;
            type = req.file.originalname.split('.');
            type = type[type.length - 1];

            const nameImage = uuidv4()

            req.body.img_link = nameImage

            newURL = await uploadFile(nameImage, type, buffer);
        };
        
        // res.status(200).json({
        //     url: newURL,
        // });

        return next();
    } catch (error) {
        
        res.status(500).json({
            message: "Internal server Error",
        });

        return next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const { file } = req;

        const { model_id } = req.params;

        let buffer;
        let type;
        let newURL;

        if (file) {
            buffer = req.file.buffer;
            type = req.file.originalname.split('.');
            type = type[type.length - 1];

            const existingProductModel = await ProductModelModel.getByIdArray(
              [model_id]
            );
            
            const existingProductModelName = existingProductModel[0].img_link

            // Caso de Update
            req.body.img_link = existingProductModelName

            // Vai sobrescrever o antigo arquivo 
            newURL = await uploadFile(existingProductModelName, type, buffer);
        };
        

        // res.status(200).json({
        //     url: newURL,
        // });

        console.log('URL AWS')
        console.log(newURL)
        
        return next();
    } catch (error) {
        
        res.status(500).json({
            message: "Internal server Error",
        });

        return next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const {
            type,
            name,
        } = req.query;

        // Verifica se existe. Caso, não, acusará erro
        await dowloadFile(name, type);

        await deleteFile(name, type);

        res.status(200).json({
            message: 'File removed.',
        });

        return next();
    } catch (error) {

        console.log(error.message);
        
        res.status(500).json({
          message: error.message
        });

        // return next({
        //   message: error.message,
        //   status: 500,
        // });
    }
};

module.exports = { download, upload, update, remove };