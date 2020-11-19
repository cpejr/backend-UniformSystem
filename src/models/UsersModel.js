/* const { create } = require('../controllers/userController'); */
const connection = require ('../database/connection');

const uuid = require("react-uuid");

module.exports = {
    async create(user){
        try {
            user.user_id = uuid();
            const response = await connection('users').insert(user);
            return user.user_id;
        } catch (error) {
            console.log(error.message);
            throw new Error('Falha na criação do usuário.');
        }
    },

    async read(){
        try {
            const response = await connection ('user').select('*');
            return response;
        } catch (error) {
            console.log(error.message);
            throw new Error('Falha na busca do usuário.');
        }
    },

    async getAllByTypes(type){
        try {
            const response = await connection ('users').where('user_type', type).select('*');
            return response;
        } catch (error) {
            console.log(error.message);
            throw new Error('Falha na busca do usuário por tipos.');
        }
    },

    async getById(id){
        try {
            const response = await connection ('users').where('user_id', id).select('*');
            return response;
        } catch (error) {
            console.log(error.message);
            throw new Error('Falha na busca do usuário por ID.');
        }
    },

    async getUserByUid(firebase_id){
        try {
            const response = await connection ('users').where('firebase_uid', firebase_id).select('*');
            return response;
        } catch (error) {
            console.log(error.message);
            throw new Error('Falha na criação do usuário pelo Firebase ID.');
        }
    },
    async update(user_id, updated_user){ 
        try {
            const response = await connection ('users').where('user_id', user_id).update(updated_user);
            return response;
        } catch (error) {
            console.log(error.message);
            throw new Error('Falha na atualização do usuário.');
        }
    },
    async delete(user_id){
        try {
            const response = await connection ('users').where('user_id', user_id).del();
            return response;
        } catch (error) {
            console.log(error.message);
            throw new Error('Falha na exclusão do usuário.');
        }
    }
}