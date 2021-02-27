/**
* @swagger
*  /address/{user_id}:
*    post:
*      summary: Cria um endereço para um usuário.
*      requestBody: 
*         required: true
*         content: 
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Address'
*      parameters: 
*       - in: header
*         name: Authorization Bearer Token
*         schema: 
*          type: string
*         required: true
*         description: Autorização básica
*       - in: params
*         name: Id do usuário
*         schema: 
*          type: string
*         required: true
*         description: Id do usuário que terá o endereço criado
*       - in: body
*         name: street
*         required: true
*         description: Rua do endereço a ser criado.
*       - in: body
*         name: neighborhood
*         required: true
*         description: Bairro do endereço a ser criado.
*       - in: body
*         name: city
*         required: true
*         description: Cidade do endereço a ser criado.
*       - in: body
*         name: state
*         required: true
*         description: Estado do endereço a ser criado.
*       - in: body
*         name: zip_code
*         required: true
*         description: CPF do endereço a ser criado.
*       - in: body
*         name: country
*         required: true
*         description: País do endereço a ser criado.
*       - in: body
*         name: complement
*         required: true
*         description: Complemento do endereço a ser criado.
*      tags: [Address]
*      description: Cria um endereço. Executado durante a criação de usuário.
*      responses: 
*       '200':
*        description: Endereço adicionado com sucesso. 
*       '500':
*        description: Erro do servidor
*
*/