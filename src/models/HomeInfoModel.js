const { response } = require('express');
const connection = require ('../database/connection');

const uuid = require("react-uuid");

module.exports = {
    async readInfo(){
        try {
            const response = await connection('homeInfo').select('key', 'data');
            return response;
        } catch (error) {
            console.log(error.message);
            throw new Error('Falha na leitura de informações da Home.');
        }
    },

    async updateInfo(updated_fields){
        try {

            // verifica se existe
            const existeTabela = await connection('homeInfo')
                .where("key", Object.keys(updated_fields)[0])
                .select('*')
                
            console.log('existeTabela', existeTabela)
            if(existeTabela == ''){
                console.log('entrou aqui')

                // updated_fields.homeInfo_id = uuid();
                var teste = updated_fields
                Object.keys(teste).forEach(async function(item){
                    const result = {
                        homeInfo_id: uuid(),
                        key: item,
                        data: ""
                    }
                    await connection('homeInfo')
                    .insert(result)
                });
                
            }
            
            Object.keys(updated_fields).forEach(async function(item){
                await connection('homeInfo')
                    .where('key', item)
                    .update({'data': updated_fields[item]})
            })

            // return response;
        } catch (error) {
            console.log(error.message);
            throw new Error('Falha na atualização das informações da Home.');
        }
    },
}