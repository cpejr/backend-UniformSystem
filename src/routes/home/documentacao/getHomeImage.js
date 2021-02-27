/**
* @swagger
*  /images:
*    get:
*      summary: Realiza o download da imagem selecionada.
*      parameters: 
*       - in: header
*         name: Authorization Bearer Token
*         schema: 
*          type: string
*         required: true
*         description: Autorização básica
*       - in: body
*         name: imgPlace
*         schema:
*          type: object
*          example:
*           imgPlace: "carousel"
*         required: true
*         description: Indica de qual seção na página Home a imagem será buscada. Pode ser carousel, whoWeAre, products.
*      tags: [Home]
*      description: Realiza a busca e download de uma imagem requisitada no body.
*      responses: 
*       '200':
*        description: Imagem buscada com sucesso
*       '400':
*        description: Requisição mal feita (bad request)
*       '404':
*        description: Não encontrado
*       '500':
*        description: Erro do servidor
*
*/