/**
* @swagger
*  /images:
*    post:
*      summary: Adiciona novas imagens na página Home
*      requestBody: 
*         required: true
*         content: 
*          application/json:
*            schema:
*              $ref: '#/components/schemas/HomeImages'
*      parameters: 
*       - in: header
*         name: Authorization
*         schema: 
*          type: string
*         required: true
*         description: Autorização básica
*       - in: file
*         name: Image File
*         schema: 
*          type: file
*         required: true
*         description: Arquivo da imagem a ser adicionada na Home
*       - in: body
*         name: imgSrc
*         required: true
*         description: Fonte da imagem (seja URL online ou endereço no armazenamento local)
*       - in: body
*         name: imgAlt
*         required: true
*         description: Texto mostrado se a imagem não carregar.
*       - in: body
*         name: imgPlace
*         required: true
*         description: Local em que a imagem está salva na Home (carousel, whoWeAre, products)
*      tags: [Home]
*      description: Criar novas imagens na página Home
*      responses: 
*       '200':
*        description: Imagem Adicionada
*       '400': 
*        description: Requisição mal feita
*       '403': 
*        description: Não autorizado
*       '500':
*        description: Erro do servidor
*
*/