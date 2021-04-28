/**
* @swagger
*  /address/{address_id}:
*    delete:
*      summary: Deleta o endereço de um usuário.
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
*         description: Id do endereço a ser deletado.
*      tags: [Address]
*      description: Deleta o endereço do usuário pelo id. Somente usuários logados podem deletar suas próprias contas.
*      responses: 
*       '200':
*        description: Endereço apagado com sucesso.
*       '500':
*        description: Erro do servidor
*
*/