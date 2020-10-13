const UsersModel = require("../models/UsersModel");
const AdressModel = require("../models/AdressModel");
<<<<<<< HEAD

const uuid = require("react-uuid");

//estamos recebendo alguns erros que não estão estourando na tela, apesar de que a
//ação nao vem sendo feita

module.exports = {
    async createUser(request, response) {//ok
=======

const uuid = require("react-uuid");

//estamos recebendo alguns erros que não estão estourando na tela, apesar de que o objeto
//nao vem senod cirado
module.exports = {
    async createUser(request, response) { //ok
>>>>>>> users_controllers_models
        try {
            const user = {
                name: request.body.name,
                user_type: request.body.user_type,
                email: request.body.email,
                cpf: request.body.cpf,
            };

            user.user_id = uuid();

<<<<<<< HEAD
            if(user.user_type === 'client'){
                    const address = {
                        street: request.body.address.street,
                        neighborhood: request.body.address.neighborhood,
                        city: request.body.address.city,
                        state: request.body.address.state,
                        zip_code: request.body.address.zip_code,
                        country: request.body.address.country,
                        complement: request.body.address.complement,
                    };
            address.user_id = user.user_id;

            await AdressModel.create(address);
            }

            await UsersModel.create(user);

=======
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

>>>>>>> users_controllers_models
            response.status(200).json("Usuário criado com sucesso");
        } catch (error) {
            console.log(error.message);
            response.status(500).json("internal server error");
        }
    },
<<<<<<< HEAD
    async allClients(request, response) { //ok
=======
    async allClients(request, response) {//ok
>>>>>>> users_controllers_models
        try {
            const clients = await UsersModel.getAllByTypes("client");
            response.status(200).json({ clients });
        } catch (error) {
            console.log(error.message);
            response.status(500).json("internal server error");
        }
    },
<<<<<<< HEAD
    async getAdresses(request, response) { //ok
        const { user_id } = request.params;
=======
    async getAdresses(request, response) {//ok //vamos mudar pra req.params
        const user_id = request.body.user_id;
>>>>>>> users_controllers_models
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
<<<<<<< HEAD
    async deleteUserClient(request, response) {//ok

        const { user_id } = request.params;

        try {
            await UsersModel.delete(user_id);

            await AdressModel.deleteByUserId(user_id);

=======
    async deleteUser(request, response) {//ok // mudar pro req

        const id = request.body.user_id;

        try {
            await UsersModel.delete(id);
>>>>>>> users_controllers_models
            response.status(200).json("Apagado com sucesso");
        } catch (error) {
            console.log(error.message);
            response.status(500).json("internal server error");
        }
    },
<<<<<<< HEAD
    async deleteUserAdm(request, response){//ok
    try {
        const {user_id}= request.params;

        await UsersModel.delete(user_id);

        response.status(200).json("Adm apagado")
    } catch (error) {
        console.log(error)
        response.status(500).json("Internal Server Error")
    }
    },
    async updateAddress(request, response) {//ok
        const { address_id } = request.body;
        const { updatedFields } = request.body;
        try {
            await AdressModel.update(address_id, updatedFields);

=======
    async updateAddress(request, response){//ok //mudar pro req
        /* const { } = request.params; */
        const {address_id, updated_address } = request.body;
        try {
            await AdressModel.update(
                address_id,
                updated_address
            );
            console.log(updated_address)
>>>>>>> users_controllers_models
            response.status(200).json("alterado com sucesso");
        } catch (error) {
            console.log(error.message);
            response.status(500).json("internal server error");
        }
    },
<<<<<<< HEAD
    async updateUser(request, response) {//ok
        const {user_id} = request.body;
        const {updatedFields} = request.body;
        try {
            updatedFields.user_id=user_id;
            
            await UsersModel.update(user_id, updatedFields);
=======
    async updateUser(request, response) { //ok //mudar pro req
        /* const {  } = request.params; */
        const { user_id , updated_user } = request.body;
        try {
            await UsersModel.update(user_id, updated_user);
>>>>>>> users_controllers_models
            response.status(200).json("alterado com sucesso");
        } catch (error) {
            console.log(error.message);
            response.status(500).json("internal server error");
<<<<<<< HEAD
        }
    },
    //=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*\\
        //Daqui para baixo foram metodos adicionados alem do pedido\\
    //=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*\\
    async deleteAddress(request, response) {//ok 
        try {
            const {address_id} = request.params;

            await AdressModel.delete(address_id);

            response.status(200).json("Apagado com sucesso");
        } catch (error) {
            console.log(error.message);
            response.status(500).json("internal server error");
        }
    },
    async getAllAddresses(request, response) {//ok
        try {
            const addresses = await AdressModel.read();

            response.status(200).json({ addresses });
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },
    async addAddress(request, response) { //ok
        try {
        const address = request.body.address;
        const {user_id}= request.params;
            
        address.user_id=user_id;

        await AdressModel.create(address);

        response.status(200).json('Endereço adicionado com sucesso!');

        } catch (error) {
            console.log(error);
            response.status(500).json("Internal server error");
        }
    },
=======
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
>>>>>>> users_controllers_models
};
