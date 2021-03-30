/**
* @swagger
*  /product/{product_id}:
*    delete:
*      summary: Deleta produtos
*      parameters: 
*       - in: header
*         name: Authorization Bearer Token
*         schema: 
*          type: string
*         required: true
*         description: Autorização básica
*       - in: params
*         name: product_id
*         schema: 
*          type: increments
*         required: true
*         description: Id do produto a ser deletado
*      tags: [Product]
*      description: Deletar produtos. Somente administradores podem deletar.
*      responses: 
*       '200':
*        description: Produto deletado
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