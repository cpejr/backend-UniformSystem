/**
* @swagger
*  /productmodels:
*    get:
*      summary: Busca todos os modelos
*      parameters: 
*       - in: header
*         name: Authorization Bearer Token
*         schema: 
*          type: string
*         required: true
*         description: Autorização básica
*      tags: [Product Model]
*      description: Busca todos os Modelos. Somente administradores podem executar tal operação.
*      responses: 
*       '200':
*        description: Vetor com todos os modelos cadastrados.
*        content: 
*          application/json:
*            example:
*               product_model_id: 1
*               img_link: ...
*               price: 26.8
*               product_id: 1
*               model_description: Uma camisa verde
*               gender: M
*               available: 1
*               name: Camisa azul
*               description: Camisa de malha
*               created_at: 2021-02-22 13:12:55
*               updated_at: 2021-02-22 13:12:55
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