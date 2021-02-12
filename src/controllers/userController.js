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
        telefone: request.body.telefone,
        cpf: request.body.cpf,
        password: request.body.password,
      };

      if (user.user_type === "adm" || user.user_type === "employee") {
        const loggedUser = request.session;

        if (loggedUser && loggedUser.user_type !== "adm") {
          return response.status(404).json({ message: "Operação proibida." });
        }
      }

      try {
        firebaseUid = await FirebaseModel.createNewUser(
          user.email,
          user.password
        );
      } catch (error) {
        return response.status(400).json({ error });
      }

      delete user.password;

      user.firebase_uid = firebaseUid;
      const resposta = await UsersModel.create(user);

      if (user.user_type === "client") {
        const { address } = request.body;
        address.user_id = resposta;
        await AdressModel.create(address);
      }

      if (resposta.errno != null) {
        return response.status(500).json({ message: "internal server error" });
      } else {
        return response
          .status(200)
          .json({ message: "Usuário criado com sucesso" });
      }
    } catch (error) {
      if (firebaseUid) {
        try {
          await FirebaseModel.deleteUser(firebaseUid);
        } catch (error) {
          throw new Error(error);
        }
      }

      if (error.errno == 19) {
        return response.status(500).json({ message: "Cpf já existe." });
      }

      response.status(500).json({ message: "Internal server error" });
    }
  },

  async forgetPassword(request, response) {
    try {
      const email = request.body.email;

      const password = await FirebaseModel.sendPasswordChangeEmail(email);
      response.status(200).json({ password });
    } catch (error) {
      response.status(500).json({
        message: error.message,
      });
    }
  },

  async allClients(request, response) {
    try {
      const clients = await UsersModel.read({ user_type: "client" });
      response.status(200).json({ clients });
    } catch (error) {
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
      response.status(500).json("internal server error");
    }
  },

  async searchUserById(req, res) {
    try {
      const { user_id } = req.params;
      const user = await UsersModel.getById(user_id);

      res.status(200).json({
        user,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json("Internal server error.");
    }
  },

  async allEmployees(request, response) {
    try {
      const employees = await UsersModel.getEmployeesAndAdm("adm");
      response.status(200).json({ employees });
    } catch (error) {
      response.status(500).json("internal server error");
    }
  },

  async deleteUserClient(request, response) {
    try {
      const loggedUserId = request.session.user_id;

      const { user_id } = request.params;

      if (loggedUserId !== user_id) {
        throw new Error("Invalid action. You are not the owner from this ID.");
      }

      const foundUser = await UsersModel.getById(user_id);

      if (!foundUser) {
        throw new Error("User not found.");
      }
      await FirebaseModel.deleteUser(foundUser[0].firebase_uid);

      await UsersModel.delete(user_id);

      await AdressModel.deleteByUserId(user_id);

      return response.status(200).json("Apagado com sucesso");
    } catch (error) {
      return response.status(500).json("Internal server error");
    }
  },

  async deleteAdmOrEmployee(request, response) {
    try {
      const { user_id } = request.params;

      const loggedUser = request.session;

      if (loggedUser.user_type !== "adm") {
        return response.status(403).json("Operação proibida.");
      }

      const foundUser = await UsersModel.getById(user_id);

      if (!foundUser) {
        return response.status(400).json("Usuário não encontrado");
      }

      await FirebaseModel.deleteUser(foundUser[0].firebase_uid);

      await UsersModel.delete(user_id);

      return response.status(200).json("Adm apagado");
    } catch (error) {
      return response.status(500).json("Internal Server Error");
    }
  },

  async updateAddress(request, response) {
    try {
      const { address_id } = request.params;
      const { updatedFields } = request.body;

      const loggedUserId = request.session.user_id;

      // Get the user_id from address
      const catchedAddress = await AdressModel.getById(address_id);

      if (catchedAddress.user_id !== loggedUserId) {
        throw new Error("Invalid action. You are not the owner from this ID.");
      }

      await AdressModel.update(address_id, updatedFields);
      response.status(200).json("alterado com sucesso");
    } catch (error) {
      response.status(500).json("internal server error");
    }
  },

  async updateUser(request, response) {
    try {
      const { user_id } = request.params;
      const loggedUserId = request.session.user_id;

      if (user_id !== loggedUserId) {
        throw new Error("Invalid action. You are not the owner from this ID.");
      }

      const { updatedFields } = request.body;
      updatedFields.user_id = user_id;

      await UsersModel.update(user_id, updatedFields);
      response.status(200).json("Alterado com sucesso");
    } catch (error) {
      response.status(500).json("Internal server error");
    }
  },

  async deleteAddress(request, response) {
    try {
      const { address_id } = request.params;

      const loggedUserId = request.session.user_id;

      // Get the user_id from address
      const catchedAddress = await AdressModel.getById(address_id);

      if (catchedAddress.user_id !== loggedUserId) {
        throw new Error("Invalid action. You are not the owner from this ID.");
      }

      await AdressModel.delete(address_id);

      response.status(200).json("Apagado com sucesso");
    } catch (error) {
      response.status(500).json("internal server error");
    }
  },

  async addAddress(request, response) {
    try {
      const address = request.body.address;
      // const { user_id } = request.params;

      const loggedUserId = request.session.user_id;

      address.user_id = loggedUserId;

      await AdressModel.create(address);

      response.status(200).json("Endereço adicionado com sucesso!");
    } catch (error) {
      response.status(500).json("Internal server error");
    }
  },
};
