/**
* @swagger
*  /product:
*    get:
*      summary: Busca todos os produtos
*      parameters: 
*       - in: header
*         name: Authorization Bearer Token
*         schema: 
*          type: string
*         required: true
*         description: Autorização básica
*      tags: [Product]
*      description: Busca todos os produtos. Somente administradores podem executar tal operação.
*      responses: 
*       '200':
*        description: Vetor com todos os produtos cadastrados.
*        content: 
*          application/json:
*            example:
*               product_id: 1
*               name: camisa verde
*               description: camisa de malha
*               product_type: sport
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