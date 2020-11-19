const { response } = require('express');
const connection = require ('../database/connection');
const uuid = require("react-uuid");

module.exports = {
    async createImage(image){
        try {

            // image.image_id = uuid();

            const response = await connection('homeImages').insert(image);
            console.log(response)
            
            return response;
        } catch (error) {
            console.log(error.message);
            // return error;
            throw new Error('Falha na criação de imagem.');
        }
    },
    async readImage(imgPlace){
        try {

            const response = await connection('homeImages')
                .where({'imgPlace': imgPlace})
                .select('*');
            return response;
        } catch (error) {
            console.log(error.message);
            // return error;
            throw new Error('Falha na leitura de imagem.');
        }
    },
    async deleteImage(image_id){
        try {
            const response = await connection ('homeImages')
                .where('image_id', image_id)
                .del();
            return response;
        } catch (error) {
            console.log(error.message);
            // return error;
            throw new Error('Falha na exclusão de imagem.');
        }
    },
}