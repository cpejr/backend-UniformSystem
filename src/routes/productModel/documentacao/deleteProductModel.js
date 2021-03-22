/**
* @swagger
*  /productmodels/{model_id}:
*    delete:
*      summary: Deleta modelos
*      parameters: 
*       - in: header
*         name: Authorization Bearer Token
*         schema: 
*          type: string
*         required: true
*         description: Autorização básica
*       - in: params
*         name: model_id
*         schema: 
*          type: increments
*         required: true
*         description: Id do modelo a ser deletado
*      tags: [Product Model]
*      description: Deletar modelos. Somente administradores podem deletar.
*      responses: 
*       '200':
*        description: Modelo deletado
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