/**
* @swagger
*  /users/employees/{user_id}:
*    get:
*      summary: Busca funcionários e administradores pelo ID
*      parameters: 
*       - in: header
*         name: Authorization Bearer Token
*         schema: 
*          type: string
*         required: true
*         description: Autorização básica
*      tags: [Users]
*      description: Busca usuários do tipo adm e employee por ID. Somente administradores podem executar tal operação.
*      responses: 
*       '200':
*        description: Usuário encontrado pelo ID.
*        content: 
*          application/json:
*            example:
*               name: Diogo ADM 2
*               firebase_id: uh31hdh232hus
*               user_id: 121323546543
*               email: diogoadm@email.com
*               cpf: 09876543211
*       '400': 
*        description: Requisição mal feita
*       '403': 
*        description: Não autorizado
*       '404': 
*        description: Usuário não encontrado
*       '500':
*        description: Erro do servidor
*
*/