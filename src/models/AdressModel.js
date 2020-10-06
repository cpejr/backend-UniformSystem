const { create } = require('../controllers/userController');
const connection = require ('../database/connection');

module.exports = {
    async create(adress){
        try {
            const response = await connection ('adress').insert(adress);
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },
    async read(){
        try {
            const response = await connection ('adress').select('*');
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },
    async getById(id){
        try {
            const response = await connection ('adress').where('adress_id', id).select('*');
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },
    async getAdressByUserId(user_id){
        try {
            const response = await connection ('adress').where('user_id', user_id).select('*');
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },
    async update(adress_id, updated_adress){
        try {
            const response = await connection ('adress').where('adress_id', adress_id).update(updated_adress);
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },
    async delete(id){
        try {
            const response = await connection ('adress').where('adress_id', adress_id).del();
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }
}