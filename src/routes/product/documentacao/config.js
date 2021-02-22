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
*        created_at:
*            type: date
*            description: Campo autogerado.
*        updated_at:
*            type: date
*            description: Campo autogerado. 
*/       