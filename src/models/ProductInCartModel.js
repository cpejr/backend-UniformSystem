
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
            return err;
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
            return err;
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
            return err;
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
            return err;
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
            return err;
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
            return err;
        }
    },
};
