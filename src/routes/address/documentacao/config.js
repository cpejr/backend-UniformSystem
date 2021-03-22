/**
* @swagger
* tags:
*   name: Address
*   description: Endereços
*/

/**
* @swagger
* components:
*  schemas:
*    Address:
*      type: object
*      required:
*        - user_id
*        - street
*        - neighborhood
*        - city
*        - state
*        - country
*        - complement
*        - zip_code
*      properties:
*        user_id:
*           type: uuid
*           description: Campo autogerado.
*        street:
*            type: string
*            description: Rua do endereço.
*        neighborhood:
*            type: string
*            description: Bairro do endereço.
*        city:
*            type: string
*            description: Cidade do endereço.
*        state:
*            type: string
*            description: Estado do endereço.
*        country:
*            type: string
*            description: País do endereço. 
*        complement:
*            type: string
*            description: Complemento do endereço.
*        zip_code:
*            type: string
*            description: CPF do endereço. 
*/