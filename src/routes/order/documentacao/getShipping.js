/**
 * @swagger
 *  /order/shipping/{zip}:
 *    get:
 *      summary: Retorna informações do envio a um CEP
 *      parameters:
 *       - in: header
 *         name: Authorization Bearer Token
 *         schema:
 *          type: string
 *         required: true
 *         description: Autorização básica
 *       - in: params
 *         name: zip
 *         schema:
 *          type: string
 *         required: true
 *         description: CEP do pedido 
 *       
 *      tags: [Order]
 *      description: Retorna informações do envio a um CEP
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
