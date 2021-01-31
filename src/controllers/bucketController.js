require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { uploadFile, deleteFile, dowloadFile } = require('../utils/bucket.js');

const ProductModelModel = require("../models/ProductModelModel");

const download = async (req, res, next) => {
  try {
    const {
      name,
      type,
    } = req.query;

    const resultDownload = await dowloadFile(name, type);

    res.attachment(`${name}.${type}`);
    res.status(200).send(resultDownload.Body);

  } catch (error) {
      console.log(error.message);
          
      res.status(500).json({
        message: error.message
      });
  }
};

const upload = async (req, res, next) => {
    try {
        console.log('teste aqui')
        const { file } = req;
        const { isLogoUpload } = req.body;
        let buffer;
        let type;
        
        if (file) {
            buffer = req.file.buffer;
            type = req.file.originalname.split('.');
            type = type[type.length - 1];
            
            const nameImage = uuidv4();
            console.log('logo aaa', isLogoUpload)
            // Para upload de logo
            if(!isLogoUpload){
                req.body.img_link = nameImage+`.${type}`;
            }else{
                // Para upload de imagem
                req.body.logo_link = nameImage+`.${type}`;
                console.log('isLogo aqui')
            }
            
            newURL = await uploadFile(nameImage, type, buffer);
        }else{
            if(!isLogoUpload){
                req.body.img_link = 'Sem imagem';
            }else{
                req.body.logo_link = 'Sem imagem';
            }
        }
        console.log('next')
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

        // type jpg no caso (NECESSÁRIO ARMAZENAR O TYPE OU PADRONIZÁ-LO)
        const {
            type,
            name,
        } = req.query;

        console.log('nome', name);
        console.log('tipo', type);

        if(name !== 'Sem imagem' && type){
            // Verifica se existe. Caso, não, acusará erro
            await dowloadFile(name, type);
    
            await deleteFile(name, type);
        }

        return next();
    } catch (error) {

        console.log(error.message);
        
        res.status(500).json({
          message: error.message
        });

    }
};

module.exports = { download, upload, update, remove };