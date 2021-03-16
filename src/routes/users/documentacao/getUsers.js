/**
* @swagger
*  /users:
*    get:
*      summary: Busca todos os clientes
*      parameters: 
*       - in: header
*         name: Authorization Bearer Token
*         schema: 
*          type: string
*         required: true
*         description: Autorização básica
*      tags: [Users]
*      description: Busca todos os usuários do tipo cliente. Somente administradores podem executar tal operação.
*      responses: 
*       '200':
*        description: Vetor com todos os clientes cadastrados.
*        content: 
*          application/json:
*            example:
*               name: Diogo
*               firebase_id: uhudehdh232hus
*               user_id: 121323213
*               email: diogo@email.com
*               cpf: 12345678910
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