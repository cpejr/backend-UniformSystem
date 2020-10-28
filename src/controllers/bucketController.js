require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { uploadFile, deleteFile, dowloadFile } = require('../utils/bucket.js');


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
            newURL = await uploadFile(uuidv4(), type, buffer);
        };
        

        res.status(200).json({
            url: newURL,
        });
        
        return next();
    } catch (error) {
        return next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const {
            type,
            name,
        } = req.query;

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

module.exports = { download, upload, remove };