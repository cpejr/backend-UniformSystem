const { response } = require('express');
const { create } = require('../controllers/userController');
const connection = require ('../database/connection');

module.exports = {
    async create(adress){
        try {
            const response = await connection ('address').insert(adress);
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },
    async read(){
        try {
            const response = await connection ('address').select('*');
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },
    async getById(id){
        try {
            const response = await connection ('address').where('adress_id', id).select('*');
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },
    async getAdressByUserId(user_id){
        try {
            const response = await connection ('address').where('user_id', user_id).select('*');
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },
    async update(address_id, updated_address){
        try {
            await connection ('address').where('address_id', address_id).update(updated_address);
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },
    async delete(address_id){
        try {
            const response = await connection ('address').where('address_id', address_id).del();
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },
    async deleteByUserId(user_id){
        try{
            const adresses = await connection('address').where('user_id',user_id).del();
        }catch(error){
            console.log(error)
            response.status(500).json('Internal server error')
        }
    }
}