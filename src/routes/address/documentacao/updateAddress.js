/**
* @swagger
*  /address/{address_id}:
*    put:
*      summary: Atualiza o endereço de um usuário.
*      parameters: 
*       - in: header
*         name: Authorization Bearer Token
*         schema: 
*          type: string
*         required: true
*         description: Autorização básica
*       - in: params
*         name: Id do endereço
*         schema: 
*          type: string
*         required: true
*         description: Id do endereço a ser atualizado
*       - in: body
*         name: Body
*         schema:
*          type: object
*          example:
*           street: rua do lado
*         required: true
*         description: Campos a serem atualizados
*      tags: [Address]
*      description: Atualiza o endereço de um usuário pelo ID dele.
*      responses: 
*       '200':
*        description: Operação bem sucedida. Atualiza o objeto address do user.
*       '500':
*        description: Erro do servidor
*
*/