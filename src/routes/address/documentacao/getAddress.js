/**
* @swagger
*  /address/{user_id}:
*    get:
*      summary: Busca o endereço de um usuário.
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
*         description: Id do usuário que precisa ser consultado o endereço
*      tags: [Address]
*      description: Busca o endereço de um usuário pelo ID dele.
*      responses: 
*       '200':
*        description: Operação bem sucedida. Retorna o objeto address.
*        content: 
*          application/json:
*            example:
*               address_id: 7
*               street: Rua Mario Werneck
*               neighborhood: Buritis
*               city: Belo Horizonte
*               state: Minas Gerais
*               zip_code: 30123123
*               country: Brasil
*               complement: apt 0
*               user_id: 8c3b2f-6c6-7d70-c772-05aed5712d04
*       '500':
*        description: Erro do servidor
*
*/