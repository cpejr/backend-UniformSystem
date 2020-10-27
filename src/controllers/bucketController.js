require('dotenv').config();
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const { uploadFile, deleteFile } = require('../utils/bucket.js');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

const download = async (req, res, next) => {
  try {
    const {
      file,
      type,
    } = req.query;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${file}.${type}`,
    };

    s3.getObject(params, (error, data) => {
      if (error) res.status(500).send(error);
      else {
        res.attachment(`${file}.${type}`);
        res.status(200).send(data.Body);
      }
    });
  } catch (error) {
    next({
      message: error.message,
      status: 500,
    });
  }
};

const upload = async (req, res, next) => {
    try {
        const { file } = req;
        let buffer;
        let type;
        let newURL;

        
        console.log(file)
        if (file) {
            buffer = req.file.buffer;
            type = req.file.originalname.split('.');
            type = type[type.length - 1];
            newURL = await uploadFile(uuidv4(), type, buffer);
        };
        
        // res.locals = {
        //     ...res.locals,
        //     data: {
        //         url: newURL,
        //     },
        //     status: 200,
        // };

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
        console.log(name)
        console.log(type)
        const resultDeleteMode = await deleteFile(name, type);
        console.log('AQUI')
        console.log(resultDeleteMode)
        // res.locals = {
        //     ...res.locals,
        //     message: 'File removed',
        //     status: 200,
        // };

        res.status(200).json({
            message: 'File removed.',
        });

        return next();
    } catch (error) {
        return next(error);
    }
};

module.exports = { download, upload, remove };