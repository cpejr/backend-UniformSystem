/**
* @swagger
*  /product:
*    post:
*      summary: Criar produtos
*      requestBody: 
*         required: true
*         content: 
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Product'
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
*         description: Nome do produto
*       - in: body
*         name: description
*         required: true
*         description: Descrição do produto 
*       - in: body
*         name: product_type
*         required: true
*         description: Tipo do produto
*       - in: body
*         name: models
*         required: true
*         description: Recebe um array vazio que será preenchido no product_models.
*      tags: [Product]
*      description: Criar produto
*      responses: 
*       '200':
*        description: Produto criado
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