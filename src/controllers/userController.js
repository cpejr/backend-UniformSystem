const UsersModel = require("../models/UsersModel");
const AdressModel = require("../models/AdressModel");

const uuid = require("react-uuid");

//estamos recebendo alguns erros que não estão estourando na tela, apesar de que o objeto
//nao vem senod cirado
module.exports = {
    async createUser(request, response) { //ok
        try {
            const user = {
                name: request.body.name,
                user_type: request.body.user_type,
                email: request.body.email,
                cpf: request.body.cpf,
            };

            user.user_id = uuid();

            const adress = {
                street: request.body.address.street,
                neighborhood: request.body.address.neighborhood,
                city: request.body.address.city,
                state: request.body.address.state,
                zip_code: request.body.address.zip_code,
                country: request.body.address.country,
                complement: request.body.address.complement,
            };

            await UsersModel.create(user);

            adress.user_id = user.user_id;

            await AdressModel.create(adress);

            response.status(200).json("Usuário criado com sucesso");
        } catch (error) {
            console.log(error.message);
            response.status(500).json("internal server error");
        }
    },
    async allClients(request, response) {//ok
        try {
            const clients = await UsersModel.getAllByTypes("client");
            response.status(200).json({ clients });
        } catch (error) {
            console.log(error.message);
            response.status(500).json("internal server error");
        }
    },
    async getAdresses(request, response) {//ok //vamos mudar pra req.params
        const user_id = request.body.user_id;
        try {
            const adresses = await AdressModel.getAdressByUserId(user_id);
            response.status(200).json({ adresses });
        } catch (error) {
            console.log(error.message);
            response.status(500).json("internal server error");
        }
    },
    async allAdm(request, response) { //ok
        try {
            const adms = await UsersModel.getAllByTypes("adm");
            response.status(200).json({ adms });
        } catch (error) {
            console.log(error.message);
            response.status(500).json("internal server error");
        }
    },
    async deleteUser(request, response) {//ok // mudar pro req

        const id = request.body.user_id;

        try {
            await UsersModel.delete(id);
            response.status(200).json("Apagado com sucesso");
        } catch (error) {
            console.log(error.message);
            response.status(500).json("internal server error");
        }
    },
    async updateAddress(request, response){//ok //mudar pro req
        /* const { } = request.params; */
        const {address_id, updated_address } = request.body;
        try {
            await AdressModel.update(
                address_id,
                updated_address
            );
            console.log(updated_address)
            response.status(200).json("alterado com sucesso");
        } catch (error) {
            console.log(error.message);
            response.status(500).json("internal server error");
        }
    },
    async updateUser(request, response) { //ok //mudar pro req
        /* const {  } = request.params; */
        const { user_id , updated_user } = request.body;
        try {
            await UsersModel.update(user_id, updated_user);
            response.status(200).json("alterado com sucesso");
        } catch (error) {
            console.log(error.message);
            response.status(500).json("internal server error");
        }
    },
    async deleteAddress(request,response){ //ok //mudar pro req
        try{
            const id = request.body.address_id;

            await AdressModel.delete(id);

            response.status(200).json('Apagado com sucesso')
        }catch(error){
            console.log(error.message);
            response.status(500).json('internal server error');
        }
    }
};
