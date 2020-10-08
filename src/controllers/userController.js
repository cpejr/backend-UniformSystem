const UsersModel = require('../models/UsersModel');
const AdressModel = require('../models/AdressModel');

module.exports={
    async createUser(request,response){
        const user = {
            name: request.body.name,
            user_type: request.body.user_type,
            email: request.body.email,
            cpf: request.body.cpf,
        };
        const adress = { 
            adress: request.body.adress,
        };

        try {
            await UsersModel.create(user);
            /*await adress.forEach(adress => {
                user_id = user.createdUser;
            });*/
            await AdressModel.create(adress);
            response.status(200).json('Endereço criado com sucesso');
        } catch (error) {
            console.log(error.message);
            response.status(500).json('internal server error');
        }
    },
    async allClients(request,response){
        try {
            const clients = await UsersModel.getAllByTypes('client');
            response.status(200).json({clients});
        } catch (error) {
            console.log(error.message);
            response.status(500).json('internal server error');
        }
    },
    async getAdresses(request,response){
        const user_id = request.body.user_id;
        try {
            const response = await AdressModel.getAdressByUserId(user_id);
            return response;
        } catch (error) {
            console.log(error.message);
            response.status(500).json('internal server error');
        }
    },
    async allAdm(request,response){
        try {
            const response = await UsersModel.getAllByTypes('adm');
            return response;
        } catch (error) {
            console.log(error.message);
            response.status(500).json('internal server error');
        }    
    },
    async deleteUser(request,response){
        const id = request.body.user_id;
        try {
            const response = await UsersModel.delete(id);
            return response.status(200).json('Apagado com sucesso');
        } catch (error) {
            console.log(error.message);
            response.status(500).json('internal server error');
        }
    },
    async updateAdress(request,response){
        const {adress_id} = request.params;
        const {updated_adress} = request.body;
        try {
            const response = await AdressModel.update(adress_id, updated_adress);
            response.status(200).json('alterado com sucesso');
        } catch (error) {
            console.log(error.message);
            response.status(500).json('internal server error');
        }
    },
    async updateUser(request,response){
        const {user_id} = request.params;
        const {updated_user} = request.body;
        try {
            const response = await UsersModel.update(user_id, updated_user);
            response.status(200).json('alterado com sucesso');
        } catch (error) {
            console.log(error.message);
            response.status(500).json('internal server error');
        }
    }
}