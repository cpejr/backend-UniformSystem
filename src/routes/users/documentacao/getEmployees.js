/**
* @swagger
*  /users/employees:
*    get:
*      summary: Busca todos os funcionários e administradores
*      parameters: 
*       - in: header
*         name: Authorization Bearer Token
*         schema: 
*          type: string
*         required: true
*         description: Autorização básica
*      tags: [Users]
*      description: Busca todos os usuários do tipo adm e employee. Somente administradores podem executar tal operação.
*      responses: 
*       '200':
*        description: Vetor com todos os employees e adms cadastrados.
*        content: 
*          application/json:
*            example:
*               name: Diogo ADM
*               firebase_id: uh31hdh232hus
*               user_id: 121323546543
*               email: diogoadm@email.com
*               cpf: 09876543211
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