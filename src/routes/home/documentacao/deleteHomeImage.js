/**
* @swagger
*  /images/{image_id}:
*    delete:
*      summary: Exclui uma imagem da página Home.
*      parameters: 
*       - in: header
*         name: Authorization Bearer Token
*         schema: 
*          type: string
*         required: true
*         description: Autorização básica
*       - in: params
*         name: image_id
*         schema:
*          type: string
*         required: true
*         description: Id da imagem que será deletada.
*      tags: [Home]
*      description: Excluir uma imagem específica da página Home.
*      responses: 
*       '200':
*        description: Imagem deletada
*       '404':
*        description: Não encontrado
*       '500':
*        description: Erro do servidor
*
*/