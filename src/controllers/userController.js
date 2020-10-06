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
        const adress = request.body.adress,
        try {
            await usersModel.create(user);
            await adress.forEach(adress => {
                user_id = user.createdUser;
            });
            await AdressModel.create(adress);
            response.status(200).json('Endereço criado com sucesso');
        } catch (error) {
            console.log(error.message);
            response.status(500).json('internal server error');
        }
    },
    async allClients(request,response){
    
    },
    async getAdresses(request,response){
    
    },
    async allAdm(request,response){
    
    },
    async deleteUser(request,response){
    
    },
    async updateAdress(request,response){
    
    },
    async updateUser(request,response){
    
    }
}