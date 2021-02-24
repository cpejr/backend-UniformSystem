/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Ordens
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Order:
 *      type: object
 *      required:
 *        - order_id
 *        - user_id
 *        - shipping_data_id
 *        - status
 *        - created_at
 *        - updated_at
 *      properties:
 *        order_id:
 *           type: uuid
 *           description: Campo autogerado.
 *        user_id:
 *            type: uuid
 *            description: Campo autogerado.
 *        shipping_data_id:
 *            type: integer
 *            description: Campo autogerado.
 *        status:
 *            type: string
 *            description: Status do pedido.
 *        created_at:
 *            type: string
 *            description: Data de criacao do pedido.
 *        updated_at:
 *            type: string
 *            description: Data de atualizacao do pedido.
 */
