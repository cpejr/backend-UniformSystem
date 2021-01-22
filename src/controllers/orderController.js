const AdressModel = require("../models/AdressModel");
const ShippingDataModel = require("../models/ShippingDataModel");
const OrderModel = require("../models/OrderModel");
const ProductInOrderModel = require("../models/ProductInOrderModel");
const ProductInCartModel = require("../models/ProductInCartModel");
const ProductModelModel = require("../models/ProductModelModel");
const Correios = require("node-correios");

module.exports = {
    async createOrder(req, res) {
        try {
            const { address_id, products } = req.body;

            // Criacão do OrderAdress a partir do id de adress do usuario recebido na requisição
            const address = await AdressModel.getById(address_id);

            //API CORREIOS
            const args = {
                nCdServico: `${req.body.service_code}`,
                sCepOrigem: `${process.env.CEPORIGEM}`,
                sCepDestino: `${address.zip_code}`,
                nVlPeso: `${process.env.VLPESO}`,
                nCdFormato: Number(process.env.CDFORMATO),
                nVlComprimento: parseFloat(process.env.VLCOMPRIMENTO),
                nVlAltura: parseFloat(process.env.VLALTURA),
                nVlLargura: parseFloat(process.env.VLLARGURA),
            };
      
            const correios = new Correios();
            const result = await correios.calcPreco(args);

            delete address.user_id;
            delete address.address_id;
            const newShipping = {
                ...address,
                shipping_value: result[0].Valor,
                service_code: "0",
            };
            const newOrderAddress_id = await ShippingDataModel.create(
                newShipping
            );

            // Criacao do order a partir dos dados recebidos na requisicao + adress criado logo acima
            const user_id = req.session.user_id;

            const order = {
                user_id: user_id,
                shipping_data_id: `${newOrderAddress_id[0]}`,
                status: "waitingPayment",
            };

            const createdOrder_id = await OrderModel.create(order);

            // Criação dos produtos do pedido:
            //Pega os id's dos products
            const productIds = products.map((item) => {
                return item.product_model_id;
            });
            
            //Retira os ids repetidos, para o caso de pedir o mesmo model de tamanhos diferentes
            const uniqueIds = productIds.filter(function(item, pos, self) {
                return self.indexOf(item) == pos;
            })

            //Busca no DB os produtos comprados, para ver se todos existem
            const boughtProducts = await ProductModelModel.getByIdArray(
                uniqueIds,
                "product_model_id price".split(" ")
            );

            //Compara para ver se todos os models pedidos existem no DB 
            if(uniqueIds.length !== boughtProducts.length) {
                return res.status(404).json({message: "Some of the products you're ordering don't exist"});
            }

            //Para cada produto no pedido, alguns dados vem da requisição e outros do DB de models
            let indexDB;
            // Percorrer o vetor de produtos na requisição;
            const productsInOrder = productIds.map((id, indexRequest) => {
                // Achar o produto correspondente no vetor de models vindos do DB
                indexDB = boughtProducts.map((product) => { return product.product_model_id; }).indexOf(id);
                // Criando o objeto
                
                return {
                    order_id: createdOrder_id,
                    product_model_id: id,
                    product_price: boughtProducts[indexDB].price,
                    amount: products[indexRequest].amount,
                    logo_link: products[indexRequest].logo_link,
                    discount: 0,
                    size: products[indexRequest].size,
                };
            });
            // Manda o vetor para o model criar os produtos no DB
            await ProductInOrderModel.create(productsInOrder);
            await ProductInCartModel.deleteByUser(user_id);

            // Se tudo deu certo, retorna que deu tudo certo
            return res.status(200).json({
                message: "Pedido efetuado com sucesso",
            });
        } catch (err) {
            console.warn(err.message);
            return res.status(500).json("Internal server error.");
        }
    },

    async getShipping(req, res) {
        try {
            const args = {
                nCdServico: `04014`,
                sCepOrigem: `${process.env.CEPORIGEM}`,
                sCepDestino: `${req.params.zip}`,
                nVlPeso: `${process.env.VLPESO}`,
                nCdFormato: Number(process.env.CDFORMATO),
                nVlComprimento: parseFloat(process.env.VLCOMPRIMENTO),
                nVlAltura: parseFloat(process.env.VLALTURA),
                nVlLargura: parseFloat(process.env.VLLARGURA),
            };
            const correios = new Correios();
            const result = await correios.calcPreco(args);

            res.status(200).json({ shipping: result[0] });
        } catch (err) {
            console.warn(err.message);
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
            const order = await OrderModel.getByFields({order_id});
            if (order.status !== "waitingPayment"){
                return res.status(400).json({message: "It is not possible to delete orders that are already paid."});
            }

            if((user.user_id!==order.user_id) && (user.user_type!=="adm")){
                return res.status(401).json({message: "You're neither this order's user or an admin."});
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
            const result = await ProductInOrderModel.getProductInOrderById(
                order_id
            );

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
};
