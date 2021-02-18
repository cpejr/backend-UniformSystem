/**
* @swagger
* tags:
*   name: Users
*   description: Usuários da aplicação
*/

/**
* @swagger
* components:
*  schemas:
*    User:
*      type: object
*      required:
*        - name
*        - email
*        - password
*        - cpf
*        - user_type
*      properties:
*        user_id:
*           type: uuid
*           description: Campo autogerado.
*        name:
*            type: string
*            description: Nome do usuário.
*        firebase_id:
*            type: string
*            description: Id do firebase
*        user_type:
*            type: enum
*            description: Tipo do usuário. Pode ser adm (Administrador), employee (Funcionário) e client (Cliente).
*        email:
*            type: string
*            description: Email do usuário. Validação do campo (tipo email).
*        password:
*            type: string
*            description: Senha do usuário. 
*        cpf:
*            type: string
*            description: CPF do usuário. Há validação dos campos (11 dígitos e não podem se repetir).
*/       