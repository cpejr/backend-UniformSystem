/**
* @swagger
*  /info:
*    get:
*      summary: Busca todas as informações adicionadas na Home.
*      parameters: 
*       - in: header
*         name: Authorization Bearer Token
*         schema: 
*          type: string
*         required: true
*         description: Autorização básica
* 
*      tags: [Home]
*      description: Busca todas as informações da página Home.
*      responses: 
*       '200':
*        description: Informações buscadas com sucesso. Retorna um objeto JSON com todos os dados da Home
*        content: 
*          application/json:
*            example:
*              textWhoWeAre: "Uma loja de e-commerce"
*              textProducts: "Sic Mundos Creatus Est"
*              contactInfo:
*                cellphone: "31 9 9563 4432"
*                address: "Rua dos Guaicurus, 120, Centro"
*                facebookUsername: "Profit Uniforms"
*                instagramUsername: "@profituniforms"
*                facebookLink: "https://facebook.com/profit"
*                instagramLink: "https://instagram.com/profit"
*                whatsAppNumber: "31 9 9563 4443"    
*       '404':
*        description: Informações não encontradas
*       '500':
*        description: Erro do servidor
*
*/