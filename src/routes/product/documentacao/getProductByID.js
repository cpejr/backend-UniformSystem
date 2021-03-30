/**
* @swagger
*  /product/{product_id}:
*    get:
*      summary: Busca produtos pelo ID
*      parameters: 
*       - in: header
*         name: Authorization Bearer Token
*         schema: 
*          type: string
*         required: true
*         description: Autorização básica
*      tags: [Product]
*      description: Busca produtos por ID. Somente administradores podem executar tal operação.
*      responses: 
*       '200':
*        description: Produto encontrado pelo ID.
*        content: 
*          application/json:
*            example:
*               product_id: 3
*               name: camisa verde
*               description: camisa de malha
*               product_type: sport
*       '400': 
*        description: Requisição mal feita
*       '403': 
*        description: Não autorizado
*       '404': 
*        description: Produto não encontrado
*       '500':
*        description: Erro do servidor
*
*/