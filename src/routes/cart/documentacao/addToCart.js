/**
* @swagger
*  /cart/addtocart:
*    put:
*      summary: Atualiza o carrinho do usuário.
*      parameters: 
*       - in: header
*         name: Authorization Bearer Token
*         schema: 
*          type: string
*         required: true
*         description: Autorização básica
*       - in: body
*         name: product_model_id
*         schema: 
*          type: integer
*         required: true
*         description: Id do modelo do produto
*       - in: body
*         name: gender
*         schema: 
*          type: enum
*         required: true
*         description: Pode ser "M" ou "F". Representa o gênero do produto.
*       - in: body
*         name: size
*         schema: 
*          type: enum
*         required: true
*         description: Pode ser "PP", "P", "M", "G" ou "GG". Representa o tamanho do produto.
*       - in: body
*         name: amount
*         schema: 
*          type: integer
*         required: true
*         description: Representa a quantidade de produto.
*       - in: body
*         name: logo_link
*         schema: 
*          type: string
*         required: true
*         description: Link da imagem aramzenada.
*       - in: body
*         name: isLogoUpload
*         schema:
*          type: boolean
*          required: true
*          description: Indica se é upload de imagem
*      tags: [Cart]
*      description: Atualiza o carrinho do usuário.
*      responses: 
*       '200':
*        description: Operação bem sucedida. Atualiza o carrinho com o produto.
*       '500':
*        description: Erro do servidor
*
*/