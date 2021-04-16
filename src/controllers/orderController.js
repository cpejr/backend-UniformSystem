const axios = require("axios");
const _ = require("lodash");

const AdressModel = require("../models/AdressModel");
const ShippingDataModel = require("../models/ShippingDataModel");
const OrderModel = require("../models/OrderModel");
const ProductInOrderModel = require("../models/ProductInOrderModel");
const ProductInCartModel = require("../models/ProductInCartModel");
const ProductModelModel = require("../models/ProductModelModel");
const ProductModel = require("../models/ProductModel");
const UsersModel = require("../models/UsersModel");

let itemsCielo = [];
let addressCielo = {};
let userCielo = {};
let orderIdCielo;
let zipCode = 0;
let shippingCieloArray = [];

async function getShippingQuote(
  ShippingItemArray,
  RecipientCEP,
  shipping_service_code
) {
  const body = {
    ShippingItemArray,
    RecipientCEP,
    SellerCEP: process.env.CEPORIGEM,
    RecipientCountry: "BR",
  };

  //if (shipping_service_code) body.ShippingServiceCode = shipping_service_code;

  const response = await axios.post(
    "http://api.frenet.com.br/shipping/quote",
    body,
    {
      headers: {
        token: process.env.FRENET_TOKEN,
      },
    }
  );

  return response.data;
}

module.exports = {
  async createOrder(req, res) {
    let createdOrder_id;
    try {
      const { address_id, products, shipping_service_code } = req.body;

      // Criacão do OrderAdress a partir do id de adress do usuario recebido na requisição
      const address = await AdressModel.getById(address_id);

      if (!address) {
        return res.status(404).json({ message: "Adress not found" });
      }

      addressCielo = {
        street: address.street,
        number: "25",
        complement: address.complement,
        district: address.neighborhood,
        city: address.city,
        state: address.state,
      };

      zipCode = address.zip_code;

      const user = await UsersModel.getById(address_id);

      // Pega os id's dos products
      const productModelIds = products.map((item) => {
        return item.product_model_id;
      });

      // Retira os ids repetidos, para o caso de pedir o mesmo model de tamanhos diferentes
      const uniqueIds = _.uniq(productModelIds);

      // Caso o numero de produtos encontrado seja diferente da quantidade de uniqueIds,
      // significa que o usuário está tentando comprar um produto indisponível.
      if (uniqueIds.length !== uniqueIds.length)
        return response
          .status(400)
          .json({ message: "Tried to buy an unavailable product" });

      // Cálculo do frete
      const productsData = await ProductModel.getProductsByProductModelId(
        uniqueIds,
        [
          "product.product_id",
          "product_model_id",
          "height",
          "length",
          "weight",
          "width",
        ]
      );

      // Constuir corpo da requisição para calculo do frete
      const ShippingItemArray = products.map((p) => {
        const data = productsData.find(
          (pr) => pr.product_model_id == p.product_model_id // Aqui tenq ser dois iguais!
        );

        for (var i = 0; i < products.length; i++) {
          itemsCielo[i] = {
            weight: data.weight,
          };
        }

        itemsCielo[0] = {
          weight: data.weight,
        };

        return {
          Height: data.height,
          Length: data.length,
          Quantity: p.amount,
          Weight: data.weight,
          Width: data.width,
        };
      });

      console.log(
        "🚀 ~ file: orderController.js ~ line 96 ~ ShippingItemArray ~ ShippingItemArray",
        ShippingItemArray
      );

      const result = await getShippingQuote(
        ShippingItemArray,
        address.zip_code,
        shipping_service_code
      );

      for (var i = 0; i < result.ShippingSevicesArray.length; i++) {
        shippingCieloArray[i] = {
          name: result.ShippingSevicesArray[i].ServiceDescription,
          price:
            parseInt(result.ShippingSevicesArray[i].ShippingPrice, 10) || 10,
          deadline:
            parseInt(result.ShippingSevicesArray[i].DeliveryTime, 10) || 10,
          carrier: 1,
        };
      }

      delete address.user_id;
      delete address.address_id;

      // Caso nao tenha encontrado algum valor para o frete, não podemos realizar o pedido
      if (
        !result.ShippingSevicesArray[0] ||
        result.ShippingSevicesArray[0].Error
      ) {
        return res.status(400).json({
          message: "Invalid service_code or invalid shipping data",
          Msg: result.ShippingSevicesArray[0].Msg,
        });
      }
      console.log(result.ShippingSevicesArray[0]);
      const newShipping = {
        ...address,
        shipping_value: result.ShippingSevicesArray[0].ShippingPrice,
        service_code: shipping_service_code,
      };

      const newOrderAddress_id = await ShippingDataModel.create(newShipping);

      // Criacao do order a partir dos dados recebidos na requisicao + adress criado logo acima
      const user_id = req.session.user_id;

      const userData = await UsersModel.getById(user_id);
      console.log("OPA", userData);

      userCielo = {
        identity: userData[0].cpf,
        fullName: userData[0].name,
        email: userData[0].email,
        phone: userData[0].telefone,
      };

      const order = {
        user_id: user_id,
        shipping_data_id: `${newOrderAddress_id[0]}`,
        status: "waitingPayment",
      };

      createdOrder_id = await OrderModel.create(order);

      // Criação dos produtos do pedido:
      //Busca no DB os produtos comprados, para ver se todos existem
      const boughtProducts = await ProductModelModel.getByIdArray(
        uniqueIds,
        "product_model_id price".split(" "),
        { available: true }
      );

      // Para cada produto no pedido, alguns dados vem da requisição e outros do DB de models
      // Percorrer o vetor de produtos na requisição;
      const productsInOrder = productModelIds.map((id, indexRequest) => {
        // Achar o produto correspondente no vetor de models vindos do DB
        const dbProductObject = boughtProducts.find(
          (product) => product.product_model_id == id // Aqui tenq ser dois iguais!
        );
        console.log(
          "🚀 ~ file: orderController.js ~ line 142 ~ createOrder ~ boughtProducts",
          boughtProducts,
          id
        );

        for (var i = 0; i < products.length; i++) {
          itemsCielo[i] = {
            name: createdOrder_id,
            description: "ProdutoExemplo01",
            unitPrice: products[i].price / 100, //dbProductObject.price,
            quantity: products[i].amount,
            type: "Asset",
            ...itemsCielo[i],
          };
        }

        // Criando o objeto
        return {
          order_id: createdOrder_id,
          product_model_id: id,
          product_price: dbProductObject.price,
          amount: products[indexRequest].amount,
          logo_link: products[indexRequest].logo_link,
          discount: 0,
          size: products[indexRequest].size,
          gender: products[indexRequest].gender,
        };
      });
      // Manda o vetor para o model criar os produtos no DB

      const teste = await ProductInOrderModel.create(productsInOrder);
      await ProductInCartModel.deleteByUser(user_id);

      console.log("ORDER ", teste);
      orderIdCielo = "1212";
      console.log("PRODUTO", itemsCielo);
      // Se tudo deu certo, retorna que deu tudo certo
      const requestBody = {
        orderNumber: orderIdCielo,
        cart: {
          discount: {
            type: "Percent",
            value: 0,
          },
          items: itemsCielo,
        },
        shipping: {
          sourceZipCode: "20020080",
          targetZipCode: zipCode,
          type: "FixedAmount",
          services: shippingCieloArray,

          address: {
            ...addressCielo,
          },
        },

        customer: {
          ...userCielo,
        },
        options: {
          antifraudEnabled: true,
          returnUrl: "http://www.cielo.com.br/",
        },
      };
      console.log("body: ", requestBody);
      console.log("services: ", shippingCieloArray);
      console.log("address: ", addressCielo);
      console.log("items: ", itemsCielo);

      const url = `https://cieloecommerce.cielo.com.br/api/public/v1/orders`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          MerchantId: "a0413171-39f1-4e87-b024-b2a3c77a83d6",
        },
      };

      let respostaCielo = await axios.post(url, requestBody, config);
      respostaCielo = respostaCielo.data;
      console.log(respostaCielo);
      return res.status(200).json(respostaCielo);
    } catch (err) {
      if (createdOrder_id) await OrderModel.delete(createdOrder_id);
      console.warn(err.message);
      return res.status(500).json("Internal server error.");
    }
  },

  async shippingQuote(req, res) {
    try {
      const { recipient_CEP, product_models, shipping_service_code } = {
        ...req.body,
      };

      const product_models_ids = product_models.map(
        (item) => item.product_model_id
      );

      const products = await ProductModel.getProductsByProductModelId(
        product_models_ids,
        [
          "product.product_id",
          "product_model_id",
          "height",
          "length",
          "weight",
          "width",
        ]
      );

      if (
        products.length === 0 ||
        products.length !== product_models_ids.length
      )
        return res.status(400).json({ message: "invalid product model ids" });

      const ShippingItemArray = product_models.map((item) => {
        const product = products.find(
          (p) => p.product_model_id == item.product_model_id
        );

        return {
          Height: product.height,
          Length: product.length,
          Quantity: item.quantity,
          Weight: product.weight,
          Width: product.width,
        };
      });

      const quote = await getShippingQuote(
        ShippingItemArray,
        recipient_CEP,
        shipping_service_code
      );

      return res.status(200).json(quote);
    } catch (err) {
      console.warn(err);
      console.warn(err.response.data);
      res.status(500).json("Internal server error.");
    }
  },

  async updateOrder(req, res) {
    const { order_id } = req.params;
    const updated_Fields = req.body;

    try {
      await OrderModel.update(order_id, updated_Fields);

      res.status(200).json({
        message: "Order atualizada com sucesso",
      });
    } catch (err) {
      res.status(500).json("Internal server error.");
    }
  },

  async deleteOrder(req, res) {
    const { order_id } = req.params;
    const user = req.session.user;

    try {
      const order = await OrderModel.getByFields({ order_id });
      if (order.status !== "waitingPayment") {
        return res.status(400).json({
          message: "It is not possible to delete orders that are already paid.",
        });
      }

      if (user.user_id !== order.user_id && user.user_type !== "adm") {
        return res
          .status(401)
          .json({ message: "You're neither this order's user or an admin." });
      }
      await ShippingDataModel.delete(order.shipping_data_id);
      await OrderModel.delete(order_id);

      res.status(200).json({
        message: "Order deletada com sucesso",
      });
    } catch (err) {
      res.status(500).json("Internal server error.");
    }
  },

  async getUserOrder(req, res) {
    const { user_id } = req.params;

    const fields = {
      user_id,
    };

    try {
      const result = await OrderModel.getByFields(fields);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json("Internal server error.");
    }
  },

  async getOrders(req, res) {
    const { user_id } = req.params;
    const filters = req.query;

    if (user_id) {
      filters.user_id = user_id;
    }

    try {
      const result = await OrderModel.getByFields(filters);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json("Internal server error.");
    }
  },

  async getProductsFromOrder(req, res) {
    const { order_id } = req.params;
    try {
      const result = await ProductInOrderModel.getProductInOrderById(order_id);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json("Internal server error.");
    }
  },

  async updateOrderAddress(req, res) {
    const { shipping_data_id } = req.params;
    const {
      street,
      neighborhood,
      city,
      state,
      zip_code,
      country,
      complement,
    } = req.body;

    const newOrderAddress = {
      street,
      neighborhood,
      city,
      state,
      zip_code,
      country,
      complement,
    };

    try {
      await ShippingDataModel.update(shipping_data_id, newOrderAddress);

      res.status(200).json({
        message: "Order Address atualizada com sucesso",
      });
    } catch (err) {
      res.status(500).json("Internal server error.");
    }
  },

  async deliverAtMail(req, res) {
    const { order_id } = req.params;

    const { tracking_code } = req.body;

    const loggedUser = req.session.user_id;

    // Atualiza com as novas informações
    const updatedShippingData = {
      delivered_by: loggedUser,
      tracking_code,
    };

    try {
      await OrderModel.updateShippingData(order_id, updatedShippingData);

      // Se nada deu errado, atualiza o status
      const updatedOrderToDelivered = {
        status: "delivered",
      };

      // atualiza a order
      await OrderModel.update(order_id, updatedOrderToDelivered);

      res.status(200).json({
        message: "Status da order atualizada sucesso!",
      });
    } catch (err) {
      res.status(500).json("Internal server error.");
    }
  },

  async getLink(request, response) {
    const requestBody = {
      OrderNumber: ordeIdCielo,
      Cart: {
        Items: [itemsCielo],
      },
      Shipping: {
        SourceZipCode: 20020080,
        TargetZipCode: zipCode,
        Services: shippingCieloArray,

        Address: {
          addressCielo,
        },
      },

      Customer: {
        userCielo,
      },
      Options: {
        AntifraudEnabled: true,
        ReturnUrl: "http://www.cielo.com.br/",
      },
    };

    const url = `https://cieloecommerce.cielo.com.br/api/public/v1/orders`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        MerchantId: "a0413171-39f1-4e87-b024-b2a3c77a83d6",
      },
    };

    try {
      let respostaCielo = await axios.post(url, requestBody, config);
      respostaCielo = respostaCielo.data;
      console.log(respostaCielo);
      return response.status(200).json(respostaCielo);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: "Internal server error" });
    }
  },
};
