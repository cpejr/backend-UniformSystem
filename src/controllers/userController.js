const UsersModel = require("../models/UsersModel");
const AdressModel = require("../models/AdressModel");
const FirebaseModel = require("../models/FirebaseModel");

// const { delete } = require("../database/connection");

//estamos recebendo alguns erros que não estão estourando na tela, apesar de que a
//ação nao vem sendo feita

module.exports = {
  async createUser(request, response) {
    
    let firebaseUid;
    
    try {
      const user = {
        name: request.body.name,
        user_type: request.body.user_type,
        email: request.body.email,
        cpf: request.body.cpf,
        password: request.body.password
      };

      if (user.user_type === "adm" || user.user_type === "employee") {
        const loggedUser = request.session;
        
        if(loggedUser && loggedUser.user_type !== "adm"){
          return response.status(403).json("Operação proibida.");
        }
      }

      firebaseUid = await FirebaseModel.createNewUser(user.email, user.password);

      delete user.password

      user.firebase_uid = firebaseUid;
      const resposta = await UsersModel.create(user);

      if (user.user_type === "client") {
        const { address } = request.body;
        address.user_id = resposta;
        console.log('address antes')
        console.log(address)
        await AdressModel.create(address);
      }

      
      if (resposta.errno == 19){
        await UsersModel.deleteByUserId(user.user_id);
        return response.status(500).json("Cpf já existe.");
        
      }else if (resposta.errno != null){
        return response.status(500).json("internal server error");
      }else{
        return response.status(200).json("Usuário criado com sucesso");
      }
    } catch (error) {

      if (firebaseUid){
        FirebaseModel.deleteUser(firebaseUid)
        throw new Error('Erro no firebase')
      }

      console.warn(error.message);
      response.status(500).json("Internal server error");
    }
  },

  async forgetPassword(request, response) {

    try {
      const email = request.body.email;

      const password = await FirebaseModel.sendPasswordChangeEmail(email);
      response.status(200).json({password});
      console.log(password);
    }catch(error) {
      console.log(error.message);
      response.status(500).json({
        message: error.message,
      });
    }

  },

  async allClients(request, response) {
    try {
      const clients = await UsersModel.getAllByTypes("client");
      response.status(200).json({ clients });
    } catch (error) {
      console.log(error.message);
      response.status(500).json("internal server error");
    }
  },

  async getAdresses(request, response) {
      try {
        // const { user_id } = request.params;

        const user_id = request.session.user_id;

        const adresses = await AdressModel.getAdressByUserId(user_id);
        response.status(200).json({ adresses });
    } catch (error) {
      console.log(error.message);
      response.status(500).json("internal server error");
    }
  },

  async allAdm(request, response) {
    try {
      const adms = await UsersModel.getAllByTypes("adm");
      response.status(200).json({ adms });
    } catch (error) {
      console.log(error.message);
      response.status(500).json("internal server error");
    }
  },

  async deleteUserClient(request, response) {
    try {
      const loggedUserId = request.session.user_id;

      const { user_id } = request.params;

      if(loggedUserId !== user_id){
        throw new Error('Invalid action. You are not the owner from this ID.')
      }

      const foundUser = await UsersModel.getById(user_id)

      if(!foundUser){
        throw new Error("User not found.")
      }
      await FirebaseModel.deleteUser(foundUser[0].firebase_uid)

      await UsersModel.delete(user_id);

      await AdressModel.deleteByUserId(user_id);

      response.status(200).json("Apagado com sucesso");
    } catch (error) {
      console.log(error.message);
      response.status(500).json("internal server error");
    }
  },

  async deleteAdmOrEmployee(request, response) {
    try {
      const { user_id } = request.params;
      
      const loggedUser = request.session;

      if(loggedUser.user_type !== "adm"){
        response.status(403).json("Operação proibida.");
      }

      await UsersModel.delete(user_id);

      response.status(200).json("Adm apagado");
    } catch (error) {
      console.log(error);
      response.status(500).json("Internal Server Error");
    }
  },

  async updateAddress(request, response) {
    try {
      const { address_id } = request.body;
      const { updatedFields } = request.body;

      const loggedUserId = request.session.user_id;

      // Get the user_id from address
      const catchedAddress = await AdressModel.getById(address_id)

      if(catchedAddress.user_id !== loggedUserId){
        throw new Error('Invalid action. You are not the owner from this ID.')
      }

      await AdressModel.update(address_id, updatedFields);
      response.status(200).json("alterado com sucesso");
    } catch (error) {
      console.log(error.message);
      response.status(500).json("internal server error");
    }
  },

  async updateUser(request, response) {
    try {
      const { user_id } = request.params;
      const loggedUserId = request.session.user_id;

      if(user_id !== loggedUserId){
        throw new Error('Invalid action. You are not the owner from this ID.')
      }

      const { updatedFields } = request.body;
      updatedFields.user_id = user_id;

      await UsersModel.update(user_id, updatedFields);
      response.status(200).json("Alterado com sucesso");
    } catch (error) {
      console.log(error.message);
      response.status(500).json("Internal server error");
    }
  },
  
  async deleteAddress(request, response) {
    try {
      const { address_id } = request.params;

      const loggedUserId = request.session.user_id;

      // Get the user_id from address
      const catchedAddress = await AdressModel.getById(address_id)

      if(catchedAddress.user_id !== loggedUserId){
        throw new Error('Invalid action. You are not the owner from this ID.')
      }

      await AdressModel.delete(address_id);

      response.status(200).json("Apagado com sucesso");
    } catch (error) {
      console.log(error.message);
      response.status(500).json("internal server error");
    }
  },

  
  async addAddress(request, response) {
    
    try {
      const address = request.body.address;
      // const { user_id } = request.params;

      const loggedUserId = request.session.user_id;
      console.log(loggedUserId)

      address.user_id = loggedUserId;

      await AdressModel.create(address);

      response.status(200).json("Endereço adicionado com sucesso!");
    } catch (error) {
      console.log(error);
      response.status(500).json("Internal server error");
    }
  },

};
