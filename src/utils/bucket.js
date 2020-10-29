require('dotenv').config();

const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

const uploadFile = async (name, type, buffer) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${name}.${type}`,
        Body: buffer,
        ACL: 'public-read',
    };

    const result = await new Promise((resolve, reject) => {
        // eslint-disable-next-line no-unused-vars
        s3.upload(params, (error, _data) => {
            if (error) return reject(error);
            return resolve(`https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${name}.${type}`);
        });

    });

    return result;
};

const dowloadFile = async (file, type) => {

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${file}.${type}`,
    };

    const result = await new Promise((resolve, reject) => {
        // eslint-disable-next-line no-unused-vars
        const downloadFile = s3.getObject(params, (error, data) => {
            if (error) reject(error);
            return resolve(data);
        });

        return downloadFile;
    });

    return result;
};

const deleteFile = async (name, type) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${name}.${type}`,
    };

    const result = await new Promise((resolve, reject) => {
        // eslint-disable-next-line no-unused-vars
        const resultDelete = s3.deleteObject(params, (error, data) => {
            
            if (error) reject(error);
            return resolve('Successfully removed.');
        });

        return resultDelete
    });


    return result;
};

module.exports = {
    uploadFile,
    deleteFile,
    dowloadFile,
};