/**
* @swagger
*  /cart/emptycart:
*    delete:
*      summary: Deleta todos os produtos do carrinho, deixando-o vazio.
*      parameters: 
*       - in: header
*         name: Authorization Bearer Token
*         schema: 
*          type: string
*         required: true
*         description: Autorização básica
*      tags: [Cart]
*      description: Deletar todos os produto no carrinho, onde pega o id do user pela sessão.
*      responses: 
*       '200':
*        description: Carrinho vazio com sucesso.
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