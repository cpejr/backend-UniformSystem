/**
* @swagger
*  /productmodels/newmodel/{model_id}:
*    post:
*      summary: Criar itens no produto
*      requestBody: 
*         required: true
*         content: 
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Product Model'
*      parameters: 
*       - in: header
*         name: Authorization
*         schema: 
*          type: string
*         required: true
*         description: Autorização básica
*       - in: params
*         name: Id do produto
*         schema: 
*          type: string
*         required: true
*         description: Id do produto onde o modelo será criado
*       - in: body
*         name: model_description
*         required: true
*         description: Descrição do item
*       - in: body
*         name: gender
*         required: true
*         description: Gênero do item. Pode ser 'M' para masculino e 'F' para feminino. 
*       - in: body
*         name: price
*         required: true
*         description: Preço do item.
*       - in: body
*         name: img_link
*         required: false
*         description: Link para a imagem do produto.
*      tags: [Product Model]
*      description: Criar item
*      responses: 
*       '200':
*        description: Model criado
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