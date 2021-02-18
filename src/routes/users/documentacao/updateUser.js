/**
* @swagger
*  /users/{user_id}:
*    put:
*      summary: Atualiza usuário pelo ID
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
*         description: Id do usuário a ser atualizado
*       - in: body
*         name: Body
*         schema:
*          type: object
*          example:
*           name: Diogo
*         required: true
*         description: Campos a ser atualizados
*      tags: [Users]
*      description: Atualizar usuário pelo ID.
*      responses: 
*       '200':
*        description: Usuário atualizado
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