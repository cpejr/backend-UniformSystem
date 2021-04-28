/**
* @swagger
*  /session/login:
*    post:
*      summary: Permite logar o usuário com email e senha obriigatórios.
*      requestBody: 
*         required: true
*         content: 
*          application/json: 
*           - email
*           - password
*      parameters: 
*       - in: body
*         name: email
*         required: true
*         description: Email do usuário
*       - in: body
*         name: password
*         required: true
*         description: Senha do usuário
*      tags: [Session]
*      description: Permite que o usuário se autentique na aplicação. 
*      responses: 
*       '200':
*        description: Autenticado com sucesso.
*        content: 
*          application/json:
*            example:
*               access: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJ1c2VyX2lkIjoiMzA4NTc3ZC03MTQ2LWRlLTQzNi1i
*               user: 
*               user_id: 121323546543
*               name: Diogo
*               email: diogoadm@email.com
*               cpf: 09876543211
*       '400': 
*        description: Requisição mal feita
*       '404': 
*        description: Não encontrado
*       '500':
*        description: Erro do servidor
*
*/