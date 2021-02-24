/**
* @swagger
* tags:
*   name: Product Model
*   description: especificações dos produtos da aplicação
*/

/**
* @swagger
* components:
*  schemas:
*    Product Model:
*      type: object
*      required:
*        - price
*        - gender
*        - model_description
*      properties:
*        product_model_id:
*           type: integer
*           description: Campo autogerado.
*        img_link:
*            type: string
*            description: Link para a imagem do produto.
*        price:
*            type: integer
*            description: Preço do produto
*        product_id:
*            type: integer
*            description: Campo autogerado.
*        model_description:
*            type: string
*            description: Descrição do item.
*        gender:
*            type: string
*            description: Gênero do item. Pode ser 'M' para masculino e 'F' para feminino. 
*        available:
*            type: integer
*            description: Se o item está disponível. '1' para disponível e '0' para indisponível.
*/ 