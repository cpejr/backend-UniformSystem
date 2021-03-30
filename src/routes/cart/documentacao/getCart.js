/**
* @swagger
*  /cart:
*    get:
*      summary: Busca os produtos no carrinho do usuário.
*      parameters: 
*       - in: header
*         name: Authorization Bearer Token
*         schema: 
*          type: string
*         required: true
*         description: Autorização básica
*      tags: [Cart]
*      description: Busca os produtos no carrinho do usuário, utilizando o user_id da sessão para identificar o usuário.
*      responses: 
*       '200':
*        description: Vetor com todos os produtos adicionados no carrinho do usuário.
*        content: 
*          application/json:
*            example:
*               product_in_cart_id: 1
*               user_id: "8e0c78-2b0-37e-84a8"
*               product_model_id: "1"
*               amount: 12
*               size: "G"
*               logo_link: "link"
*               gender: "M"
*               name: Camisa azul
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