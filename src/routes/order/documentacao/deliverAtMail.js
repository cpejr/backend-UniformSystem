/**
 * @swagger
 *  /order/deliveratmail/{order_id}:
 *    get:
 *      summary: Atualiza e retorna o status do pedido
 *      parameters:
 *       - in: header
 *         name: Authorization Bearer Token
 *         schema:
 *          type: string
 *         required: true
 *         description: Autorização básica
 *       - in: params
 *         name: user_id
 *         schema:
 *          type: string
 *         required: true
 *         description: ID da ordem que está buscando as informações 
 *       - in: body
 *         name: tracking_code
 *         required: true
 *         description: Código de rastreamento do pedido
 *       
 *      tags: [Order]
 *      description: Atualiza e retorna o status do pedido
 *      responses:
 *       '200':
 *        description: Informações buscadas com sucesso
 *       '403':
 *        description: Não autorizado
 *       '404':
 *        description: Não encontrado
 *       '500':
 *        description: Erro do servidor
 *
 */
