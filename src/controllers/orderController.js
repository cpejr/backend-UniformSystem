const AdressModel = require("../models/AdressModel");
const ShippingDataModel = require("../models/ShippingDataModel");
const OrderModel = require("../models/OrderModel");
const ProductInOrderModel = require("../models/ProductInOrderModel");
const ShirtModelModel = require("../models/ShirtModelModel");




module.exports = {

    async createOrder(req, res) {
        try {
        
            const { address_id, products } = req.body;

            // Criacão do OrderAdress a partir do id de adress do usuario recebido na requisição
            const address = await AdressModel.getById(address_id);
            delete address[0].user_id;
            delete address[0].address_id;
            const newShipping ={
                ...address[0],
                shipping_value: 0,
                service_code: '0',
            }
            const newOrderAddress_id = await ShippingDataModel.create(newShipping);
            console.log(newShipping)
            
            // Criacao do order a partir dos dados recebidos na equisicao + adress criado logo acima
            const user_id = 1;
            const shipping = 10.75
            const order = {
                user_id: user_id,
                is_paid: false,
                shipping_data_id: newOrderAddress_id,
                status: 'Preparing',
                shipping: shipping,
            }


            const createdOrder_id = await OrderModel.create(order);
            console.log('AQUI O');
            console.log(createdOrder_id)
            // Criação dos produtos do pedido:
            //Pega os id's dos products da requisicao para buscá-los no DB
            const productIds = products.map(item => {return item.shirt_model_id;});

            console.log(productIds);
            //Busca no DB os produtos comprados
            const boughtProducts = await ShirtModelModel.getByIdArray(productIds, "shirt_model_id price".split(' '));
            //Criando o vetor de produtos no pedido, pegando dados do vetor retornado do DB e o respectivo objeto vindo da requisição
            console.log(boughtProducts);
            let index;
            const productsInOrder = boughtProducts.map(item => {
                index = productIds.indexOf(item.shirt_model_id);
                return ({
                    order_id: createdOrder_id,
                    shirt_model_id: item.shirt_model_id,
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
}