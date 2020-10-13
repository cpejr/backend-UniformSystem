const { create } = require('../controllers/userController');
const connection = require ('../database/connection');

module.exports = {
    async create(user){
        try {
            const response = await connection ('users').insert(user);
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },

    async read(){
        try {
            const response = await connection ('user').select('*');
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },

    async getAllByTypes(type){
        try {
            const response = await connection ('users').where('user_type', type).select('*');
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },

    async getById(id){
        try {
            const response = await connection ('users').where('user_id', id).select('*');
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },

    async update(user_id, updated_user){ 
        try {
            const response = await connection ('users').where('user_id', user_id).update(updated_user);
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },
    async delete(user_id){
        try {
            const response = await connection ('users').where('user_id', user_id).del();
            return response;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }
}