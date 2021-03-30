/**
* @swagger
*  /cart/{product_in_cart_id}:
*    put:
*      summary: Atualiza a quantidade do produto no carrinho.
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
*          type: integer
*         required: true
*         description: Id do produto no carrinho
*       - in: body
*         name: amount
*         schema: 
*          type: integer
*         required: true
*         description: Nova quantidade do produto.
*      tags: [Cart]
*      description: Atualiza a quantidade do produto no carrinho.
*      responses: 
*       '200':
*        description: Operação bem sucedida. Produto no carrinho atualizado com sucesso.
*       '500':
*        description: Erro do servidor
*
*/