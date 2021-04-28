/**
* @swagger
*  /productmodels/model/{model_id}:
*    put:
*      summary: Atualiza itens pelo ID
*      parameters: 
*       - in: header
*         name: Authorization Bearer Token
*         schema: 
*          type: string
*         required: true
*         description: Autorização básica
*       - in: params
*         name: Id do produto
*         schema: 
*          type: string
*         required: true
*         description: Id do produto a ser atualizado
*       - in: body
*         name: Body
*         schema:
*          type: object
*          example:
*           price: 22.6
*         required: true
*         description: Campos a serem atualizados
*      tags: [Product Model]
*      description: Atualizar item pelo ID.
*      responses: 
*       '200':
*        description: Model atualizado
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