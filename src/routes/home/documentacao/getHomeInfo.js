/**
* @swagger
*  /info:
*    get:
*      summary: Busca todas as informações adicionadas na Home.
*      parameters: 
*       - in: header
*         name: Authorization Bearer Token
*         schema: 
*          type: string
*         required: true
*         description: Autorização básica
* 
*      tags: [Home]
*      description: Busca todas as informações da página Home.
*      responses: 
*       '200':
*        description: Informações buscadas com sucesso
*       '404':
*        description: Informações não encontradas
*       '500':
*        description: Erro do servidor
*
*/