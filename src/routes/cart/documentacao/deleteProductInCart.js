/**
* @swagger
*  /cart/{product_in_cart_id}:
*    delete:
*      summary: Deleta produto do carrinho, pelo ID.
*      parameters: 
*       - in: header
*         name: Authorization Bearer Token
*         schema: 
*          type: string
*         required: true
*         description: Autorização básica
*       - in: params
*         name: product_in_cart_id
*         schema: 
*          type: string
*         required: true
*         description: Id do produto que quer deletar no carrinho
*      tags: [Cart]
*      description: Deletar produto no carrinho.
*      responses: 
*       '200':
*        description: Produto deletado do carrinho.
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