const connection = require("../database/connection");

module.exports = {

    async create(newShirt){

        try{
            const response = await connection("shirt").insert(newShirt);
            return response;
        }catch(err){
            console.log(err.message);
            return err;
        }
    },

    async read(){
        const response = await connection("shirt").select('*');
        return response;
    },

    async getById(id){
        const response = await connection("shirt")
        .where('shirt_id', id)
        .select('*');

        return response;
    },

    async update(shirtId, updatedFields){
        const response = await connection("shirt")
        .where('shirt_id', shirtId)
        .update(updatedFields);

        return response;
    },

    async delete(shirtId){
        const response = await connection("shirt")
        .where('shirt_id', shirtId)
        .del();
        
        return response;
    }

};