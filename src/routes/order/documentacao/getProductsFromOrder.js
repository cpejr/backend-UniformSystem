/**
 * @swagger
 *  /order/{product_id}:
 *    get:
 *      summary: Busca um produto de uma ordem.
 *      requestBody:
 *         required: true
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Order'
 *      parameters:
 *       - in: header
 *         name: Authorization Bearer Token
 *         schema:
 *          type: string
 *         required: true
 *         description: Autorização básica
 *       - in: params
 *         name: Id da ordem
 *         schema:
 *          type: string
 *         required: true
 *         description: Id da ordem que será criada.
 *       - in: params
 *         name: Id do usuário
 *         required: true
 *         description: Id do usuário que será criado.
 *       - in: params
 *         name: Id do shipping_data
 *         required: true
 *         description: Id do shipping_data que será criado.
 *       - in: body
 *         name: status
 *         required: true
 *         description: Status da ordem criada.
 *       - in: body
 *         name: created_at
 *         required: true
 *         description: Data de criacao da ordem.
 *       - in: body
 *         name: updated_at
 *         required: true
 *         description: Data da atualizacao da ordem.
 *      tags: [Order]
 *      description: Busca um produto de uma ordem.
 *      responses:
 *       '200':
 *        description: Produto encontrado com sucesso.
 *       '403':
 *        description: Não autorizado
 *       '404':
 *        description: Não encontrado
 *       '500':
 *        description: Erro do servidor
 *
 */
