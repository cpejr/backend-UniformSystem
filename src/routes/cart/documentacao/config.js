/**
* @swagger
* tags:
*   name: Cart
*   description: Pedidos no Carrinho
*/

/**
* @swagger
* components:
*  schemas:
*    Product_in_cart:
*      type: object
*      required:
*        - user_id
*        - product_model_id
*        - amount
*        - logo_link
*        - gender
*        - size
*      properties:
*        product_in_cart:
*           type: string
*           description: Id para product_in_cart.
*        user_id:
*           type: uuid
*           description: Id referente ao usuário.
*        product_model_id:
*            type: integer
*            description: Id referente ao product_model.
*        amount:
*            type: integer
*            description: Quantidade do produto.
*        logo_link:
*            type: integer
*            description: Link da Imagem da logo aramzenada.
*        gender:
*            type: enum
*            description: Pode ser "M" ou "F". Representa o gênero do produto.
*        size:
*            type: enum
*            description: Pode ser "PP", "P", "M", "G" ou "GG". 
*/