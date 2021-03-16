/**
* @swagger
*  /info:
*    put:
*      summary: Atualiza as informações da página Home.
*      requestBody: 
*         required: true
*         description: Exemplo de body a ser enviado na requisição. Note que os dados são salvos no banco de dados de maneira diferente da enviada no body.
*         content: 
*          application/json:
*            schema:
*              type: object
*              example:
*                textWhoWeAre: "Uma loja de e-commerce"
*                textProducts: "Sic Mundos Creatus Est"
*                contactInfo:
*                  cellphone: "31 9 9563 4432"
*                  address: "Rua dos Guaicurus, 120, Centro"
*                  facebookUsername: "Profit Uniforms"
*                  instagramUsername: "@profituniforms"
*                  facebookLink: "https://facebook.com/profit"
*                  instagramLink: "https://instagram.com/profit"
*                  whatsAppNumber: "31 9 9563 4443"     
*      parameters:
*       - in: header
*         name: Authorization Bearer Token
*         schema:
*          type: string
*         required: true
*       - in: body
*         name: textWhoWeAre
*         required: true
*         description: Texto expondo quem são os autores / donos.
*       - in: body
*         name: textProducts
*         required: true
*         description: Texto que acompanha os produtos vendidos.
*       - in: body
*         name: contactInfo
*         schema:
*           type: object
*           example:
*             cellphone: "31 9 9563 4432"
*             address: "Rua dos Guaicurus, 120, Centro"
*             facebookUsername: "Profit Uniforms"
*             instagramUsername: "@profituniroms"
*             facebookLink: "https://facebook.com/profit"
*             instagramLink: "https://instagram.com/profit"
*             whatsAppNumber: "31 9 9563 4443"
*         required: true
*         description: Objeto com informações de contato da empresa
*       - in: body
*         name: cellphone
*         required: true
*         description: Telefone celular de contato da empresa.
*       - in: body
*         name: address
*         required: true
*         description: Endereço da empresa.
*       - in: body
*         name: faceookLink
*         required: true
*         description: Link da página de facebook da empresa.
*       - in: body
*         name: instagramLink
*         required: true
*         description: Link da página de instagram da empresa.
*       - in: body
*         name: whatsAppNumber
*         required: true
*         description: Número de whatsApp da empresa para contato.
*      tags: [Home]
*      description: Atualizar as informações da página Home.
*      responses:
*       '200':
*        description: Informações da Home atualizadas
*       '400':
*        description: Requisição mal feita (bad request)
*       '500':
*        description: Erro do servidor
*
*/