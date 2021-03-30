/**
* @swagger
* tags:
*   name: Home
*   description: Imagens e Informações da página Home
*/

/**
* @swagger
* components:
*  schemas:
*    HomeInfo:
*      type: object
*      required:
*        - textWhoWeAre
*        - cellphone
*        - textProducts
*        - address
*        - facebookLink
*        - instagramLink
*        - whatsAppNumber
*      properties:
*        homeInfo_id:
*           type: uuid
*           description: Campo autogerado de identificação.
*        key:
*            type: string
*            description: Qual o tipo da informação do usuário
*        data:
*            type: string
*            description: Informação do usuário, do tipo selecionado na key acima.
*        created_at:
*            type: timestampz
*            description: Timestamp de criação dos dados.
*        updated_at:
*            type: timestampz
*            description: Timestamp de update dos dados. 
*
*    HomeImages:
*      type: object
*      required:
*        - imgSrc
*        - imgAlt
*        - imgPlace
*      properties:
*        image_id:
*           type: uuid
*           description: Campo autogerado de identificação.
*        imgSrc:
*            type: string
*            description: Fonte da imagem (seja URL online ou endereço no armazenamento local)
*        imgAlt:
*            type: string
*            description: Texto mostrado se a imagem não carregar.
*        imgPlace:
*            type: string
*            description: Local em que a imagem está salva na Home (carousel, whoWeAre, products)
*        created_at:
*            type: timestampz
*            description: Timestamp de criação dos dados.
*        updated_at:
*            type: timestampz
*            description: Timestamp de update
*/