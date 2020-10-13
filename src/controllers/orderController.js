const AdressModel = require("../models/AdressModel");
const OrderAddresslModel = require("../models/OrderAddresslModel");
const OrderlModel = require("../models/OrderlModel");
const ProductInOrderModel = require("../models/ProductInOrderModel");
const ShirtModelModel = require("../models/ShirtModelModel");

module.exports = {

    async createOrder(req, res) {

        const { address_id, products } = req.body;

        // const initialOrder = {
        //     address_id: address_id,
        //     products: [{
        //         shirt_model: products.shirt_model,
        //         product_id: products.product_id,
        //         amount: products.amount,
        //         logo_link: products.logo_link,
        //         size: products.size,
        //     }]
        // };

        const productIds = products.map(item => {
            return item.product_id;
        });

        const address = await AdressModel.getById(address_id);
    
        const newOrderAddress = await OrderAddresslModel.create(address);

        const user_id = 1;
        const order = {
            user_id: user_id,
            is_paid: false,
            order_address_id: newOrderAddress,
            status: 'Preparing',
            shipping: 10.75,
        }

        const createdOrder = await OrderlModel.create(order);

        const returnedProducts = await ShirtModelModel.getByIdArray(productIds, "shirt_model_id price");

        try {

            res.status(200).json({
                message: "",
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

            await OrderlModel.update(order_id, updated_Fields)

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

            await OrderlModel.delete(order_id)

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

            const result = await OrderlModel.getByFields(fields)

            res.status(200).json(result);
    
        } catch (err) {
            console.log(err.message);
            res.status(500).json("Internal server error.");
        }
    },

    async getOrders(req, res) {

        const fields = req.params;
        const returningFields = req.body;

        try {

            const result = await OrderlModel.getByFields(fields, returningFields)

            res.status(200).json(result);
    
        } catch (err) {
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
}