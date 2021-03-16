/**
* @swagger
*  /users:
*    post:
*      summary: Criar usuários
*      requestBody: 
*         required: true
*         content: 
*          application/json:
*            schema:
*              $ref: '#/components/schemas/User'
*      parameters: 
*       - in: header
*         name: Authorization
*         schema: 
*          type: string
*         required: true
*         description: Autorização básica
*       - in: body
*         name: name
*         required: true
*         description: Nome do usuário
*       - in: body
*         name: email
*         required: true
*         description: E-mail do usuário
*       - in: body
*         name: cpf
*         required: true
*         description: CPF do usuário
*       - in: body
*         name: user_type
*         required: true
*         description: Tipo do usuário (adm, employee e client)
*       - in: body
*         name: password
*         required: true
*         description: Senha do usuário
*       - in: body
*         name: address
*         required: false
*         description: Endereço do usuário (somente para Clientes). Possui os campos street, neighborhood, city, state, zip_code, country, complement.
*      tags: [Users]
*      description: Criar usuário
*      responses: 
*       '200':
*        description: Usuário criado
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