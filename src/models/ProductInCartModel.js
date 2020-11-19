
const connection = require("../database/connection");
/* const { create } = require('../controllers/userController'); */
/* const { update, delete } = require('./ProductModel'); */
/* const { response } = require("express");  */

module.exports = {
    async create(newProdCart) {
        try {
            const response = await connection("product_in_cart").insert(
                newProdCart
            );
            return response;
        } catch (err) {
            console.log(err.message);
            throw new Error('Falha na criação do carrinho de produtos.');
        }
    },

    async update(idProdCart, updatedFields) {
        try {
            const response = await connection("product_in_cart")
                .where("product_in_cart_id", idProdCart)
                .update(updatedFields);
            return response;
        } catch (err) {
            console.log(err.message);
            throw new Error('Falha na atualização do carrinho de produtos.');
        }
    },
    async delete(idProdCart) {
        try {
            const response = await connection("product_in_cart")
                .where("product_in_cart_id", idProdCart)
                .del();
            return response;
        } catch (err) {
            console.log(err.message);
            throw new Error('Falha na exclkusão do carrinho de produtos.');
        }
    },
    async getByUser(userId) {
        try {
            const response = await connection("product_in_cart")
                .where("user_id", userId)
                .select("*");
            return response;
        } catch (err) {
            console.log(err.message);
            throw new Error('Falha na busca do carrinho de produtos.');
        }
    },
    async getById(idProdCart, select="*") {
        try {
            const response = await connection("product_in_cart")
                .where("product_in_cart_id", idProdCart)
                .select(select).first();
            return response;
        } catch (err) {
            console.log(err.message);
            throw new Error('Falha na busca do carrinho de produtos.');
        }
    },
    async deleteByUser(userId) {
        try {
            const response = await connection("product_in_cart")
                .where("user_id", userId)
                .del();
            return response;
        } catch (err) {
            console.log(err.message);
            throw new Error('Falha na exclusão do carrinho de produtos.');
        }
    },
};
