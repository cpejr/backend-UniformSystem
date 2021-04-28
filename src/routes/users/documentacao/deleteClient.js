/**
* @swagger
*  /users/delClient/{user_id}:
*    delete:
*      summary: Deleta usuários do tipo cliente
*      parameters: 
*       - in: header
*         name: Authorization Bearer Token
*         schema: 
*          type: string
*         required: true
*         description: Autorização básica
*       - in: params
*         name: user_id
*         schema: 
*          type: string
*         required: true
*         description: Id do cliente a ser deletado
*      tags: [Users]
*      description: Deletar usuário do tipo Cliente. Somente o dono do id pode se deletar.
*      responses: 
*       '200':
*        description: Cliente deletado
*       '400': 
*        description: Requisição mal feita
*       '403': 
*        description: Não autorizado
*       '404': 
*        description: Não encontrado
*       '500':
*        description: Erro do servidor
*
*/