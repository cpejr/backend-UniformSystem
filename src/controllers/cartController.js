const ProductInCartModel = require('../models/ProductInCartModel');

module.exports={
    async addToCart(req, res){
        try{
            
            const user_id = req.session.user_id;

            const productInCart = {
                product_model_id: req.body.product_model_id,
                size: req.body.size,
                amount: req.body.amount,
                logo_link: req.body.logo_link,
            };
            productInCart.user_id = user_id;

            const createdProductInCart = await ProductInCartModel.create(productInCart);

            res.status(200).json({
                message: "Produto no carrinho criado com sucesso!"
            });
        }catch(err){
            res.status(500).json("Internal server error.");
        }
    },

    async removeFromCart(req, res){
        try{
            const {product_in_cart_id} = req.params;

            const user_id = req.session.user_id;
            
            const user = await ProductInCartModel.getById(product_in_cart_id, "user_id");

            if (user_id === user.user_id){
                await ProductInCartModel.delete(product_in_cart_id);
                return res.status(200).json("Produto removido do carrinho com sucesso.")
            }else{
                return res.status(401).json("Acess Denied");
            }
        }catch(err){
            res.status(500).json("Internal server error.");
        }
    },

    async getCart(req, res){
        try{
            const user_id = req.session.user_id;
            const cart = await ProductInCartModel.getByUser(user_id);
            res.status(200).json(cart);

        }catch(err){
            res.status(500).json("Internal server error.");
        }
    },

    async updateCart(req, res){
        try{
            const {product_in_cart_id} = req.params;
            const fields = req.body;
            ProductInCartModel.update(product_in_cart_id, fields);
            res.status(200).json("Carrinho atualizado com sucesso.");
        }catch(err){
            res.status(500).json("Internal server error."); 
        }
    },

    async emptyCart(req, res){
        try{
            const user_id = 1;
            await ProductInCartModel.deleteByUser(user_id);
            res.status(200).json("Carrinho deletado com sucesso.")

        }catch(err){
            res.status(500).json("Internal server error."); 
        }
    }
}