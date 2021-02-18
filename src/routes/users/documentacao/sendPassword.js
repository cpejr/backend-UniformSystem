/**
* @swagger
*  /users/sendpassword:
*    post:
*      summary: Manda requisição para o firebase requerindo troca de senha.
*      parameters: 
*       - in: body
*         name: Email
*         schema: 
*          type: string
*         required: true
*         description: Email do usuário que esqueceu a senha
*      tags: [Users]
*      description: Manda requisição para o firebase para que o mesmo mande a solicitação de nova senha para o usuário.
*      responses: 
*       '200':
*        description: Requisição de "Esqueci minha senha" feita com sucesso.
*       '400':
*        description: Requisição mal feita
*       '404': 
*        description: Rota não encontrado
*       '500':
*        description: Erro do servidor
*
*/