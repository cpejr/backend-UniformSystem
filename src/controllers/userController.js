const UsersModel = require("../models/UsersModel");
const AdressModel = require("../models/AdressModel");

const uuid = require("react-uuid");

//estamos recebendo alguns erros que não estão estourando na tela, apesar de que a
//ação nao vem sendo feita

module.exports = {
  async createUser(request, response) {
    try {
      const user = {
        name: request.body.name,
        user_type: request.body.user_type,
        email: request.body.email,
        cpf: request.body.cpf,
      };

      user.user_id = uuid();

      if (user.user_type === "client") {
        const { address } = request.body;
        address.user_id = user.user_id;

        await AdressModel.create(address);
      }
      const resposta = await UsersModel.create(user);

      if (resposta.errno == 19){
        response.status(500).json("Cpf já existe.");
      }else if (resposta.errno != null){
        response.status(500).json("internal server error");
      }else{
        response.status(200).json("Usuário criado com sucesso");
      }
    } catch (error) {
      console.log(error.message);
      response.status(500).json("internal server error");
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
        const { user_id } = request.params;
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
      const { user_id } = request.params;

      await UsersModel.delete(user_id);

      await AdressModel.deleteByUserId(user_id);

      response.status(200).json("Apagado com sucesso");
    } catch (error) {
      console.log(error.message);
      response.status(500).json("internal server error");
    }
  },

  async deleteUserAdm(request, response) {
    try {
      const { user_id } = request.params;

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
      const { updatedFields } = request.body;
      updatedFields.user_id = user_id;

      await UsersModel.update(user_id, updatedFields);
      response.status(200).json("alterado com sucesso");
    } catch (error) {
      console.log(error.message);
      response.status(500).json("internal server error");
    }
  },
  
  async deleteAddress(request, response) {
    try {
      const { address_id } = request.params;

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
      const { user_id } = request.params;

      address.user_id = user_id;

      await AdressModel.create(address);

      response.status(200).json("Endereço adicionado com sucesso!");
    } catch (error) {
      console.log(error);
      response.status(500).json("Internal server error");
    }
  },

};
