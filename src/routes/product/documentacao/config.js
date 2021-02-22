/**
* @swagger
* tags:
*   name: Product
*   description: Produtos da aplicação
*/

/**
* @swagger
* components:
*  schemas:
*    Product:
*      type: object
*      required:
*        - name
*        - description
*        - product_type
*        - price
*        - gender
*        - model_description
*      properties:
*        product_id:
*           type: increments
*           description: Campo autogerado.
*        name:
*            type: string
*            description: Nome do produto.
*        description:
*            type: string
*            description: Descrição do produto
*        product_type:
*            type: string
*            description: Tipo do produto.
*        price:
*            type: number
*            description: Preço do produto.
*        gender:
*            type: valid
*            description: Gênero. Pode ser M (masculino) ou F (feminino). 
*        model_description:
*            type: string
*            description: Descrição do item.
*/       