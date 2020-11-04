const AdressModel = require("../models/AdressModel");
const ShippingDataModel = require("../models/ShippingDataModel");
const OrderModel = require("../models/OrderModel");
const ProductInOrderModel = require("../models/ProductInOrderModel");
const ProductModelModel = require("../models/ProductModelModel");
const Correios = require('node-correios');

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

            console.log(args)
            const correios = new Correios();
            const result = await correios.calcPreco(args)

            delete address.user_id;
            delete address.address_id;
            const newShipping ={
                ...address,
                shipping_value: result[0].Valor,
                service_code: '0',
            }
            const newOrderAddress_id = await ShippingDataModel.create(newShipping);

           
            // Criacao do order a partir dos dados recebidos na equisicao + adress criado logo acima
            const user_id = req.session.user_id;


            const order = {
                user_id: user_id,
                shipping_data_id: `${newOrderAddress_id[0]}`,
                status: 'waitingPayment',
            }


            const createdOrder_id = await OrderModel.create(order);
            // Criação dos produtos do pedido:
            //Pega os id's dos products da requisicao para buscá-los no DB
            const productIds = products.map(item => {return item.product_model_id;});

            //Busca no DB os produtos comprados
            const boughtProducts = await ProductModelModel.getByIdArray(productIds, "product_model_id price".split(' '));
            
            if(boughtProducts.length !== productIds.length){
                return res.status(404).json({
                    message: "Bought Products is different from productsIds.",
                });
            }
            //Criando o vetor de produtos no pedido, pegando dados do vetor retornado do DB e o respectivo objeto vindo da requisição;
            let index;
            const productsInOrder = boughtProducts.map(item => {
                index = productIds.indexOf(item.product_model_id);
                return ({
                    order_id: createdOrder_id,
                    product_model_id: item.product_model_id,
                    product_price: item.price,
                    amount: products[index].amount,
                    logo_link: products[index].logo_link,
                    discount: 0,
                    size: products[index].size,
                });
            });
            // Manda o vetor para o model criar os produtos no DB
            await ProductInOrderModel.create(productsInOrder);

            // Se tudo deu certo, retorna que deu tudo certo
            res.status(200).json({
                message: "Pedido efetuado com sucesso",
            });

        } catch (err) {
            console.log(err.message);
            res.status(500).json("Internal server error.");
        }
    },

    async updateOrder(req, res) {

        const { order_id } = req.params;
        const updated_Fields = req.body;

        try {

            await OrderModel.update(order_id, updated_Fields)

            res.status(200).json({
                message: "Order atualizada com sucesso",
            });
    
        } catch (err) {
            console.log(err.message);
            res.status(500).json("Internal server error.");
        }
    },

    async deleteOrder(req, res) {

        const { order_id } = req.params;

        try {

            await OrderModel.delete(order_id)

            res.status(200).json({
                message: "Order deletada com sucesso",
            });
    
        } catch (err) {
            console.log(err.message);
            res.status(500).json("Internal server error.");
        }
    },

    async getUserOrder(req, res) {

        const { user_id } = req.params;

        const fields = {
            user_id,
        }

        try {
            const result = await OrderModel.getByFields(fields)

            res.status(200).json(result);
    
        } catch (err) {
            console.log(err.message);
            res.status(500).json("Internal server error.");
        }
    },

    async getOrders(req, res) {
        const { user_id } = req.params;
        const filters = req.query;

        if(user_id){
            filters.user_id = user_id;
        }

        try {
            const result = await OrderModel.getByFields(filters)

            res.status(200).json(result);
    
        }catch (err){
            console.log(err.message);
            res.status(500).json("Internal server error.");
        }
    },

    async getProductsFromOrder(req, res) {
        const { order_id } = req.params;
        try {

            const result = await ProductInOrderModel.getProductInOrderById(order_id)

            res.status(200).json(result);
    
        } catch (err) {
            console.log(err.message);
            res.status(500).json("Internal server error.");
        }
    },

    async createOrderAddress(req, res) {

        const { street, neighborhood, city, state, zip_code, country, complement } = req.body;

        const newOrderAddress = { 
            street, 
            neighborhood, 
            city, 
            state, 
            zip_code, 
            country, 
            complement 
        }

        try {

            await ShippingDataModel.create(newOrderAddress)

            res.status(200).json({
                message: "Order Address criada com sucesso",
            });
    
        } catch (err) {
            console.log(err.message);
            res.status(500).json("Internal server error.");
        }
    },

    async updateOrderAddress(req, res) {

        const { shipping_data_id } = req.params;
        const { street, neighborhood, city, state, zip_code, country, complement } = req.body;

        const newOrderAddress = { 
            street, 
            neighborhood, 
            city, 
            state, 
            zip_code, 
            country, 
            complement 
        }

        try {

            await ShippingDataModel.update(shipping_data_id, newOrderAddress)

            res.status(200).json({
                message: "Order Address atualizada com sucesso",
            });
    
        } catch (err) {
            console.log(err.message);
            res.status(500).json("Internal server error.");
        }
    },

    async deleteOrderAddress(req, res) {

        const { shipping_data_id } = req.params;

        try {
            await ShippingDataModel.delete(shipping_data_id);

            res.status(200).json({
                message: "Order Address deletada com sucesso",
            });
    
        } catch (err) {
            console.log(err.message);
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
        }

        try {
            await OrderModel.updateShippingData(order_id, updatedShippingData);

            // Se nada deu errado, atualiza o status
            const updatedOrderToDelivered = {
                status: 'delivered'
            }

            // atualiza a order
            await OrderModel.update(order_id, updatedOrderToDelivered)

            res.status(200).json({
                message: "Status da order atualizada sucesso!",
            });
    
        } catch (err) {
            console.log(err.message);
            res.status(500).json("Internal server error.");
        }
    },
}