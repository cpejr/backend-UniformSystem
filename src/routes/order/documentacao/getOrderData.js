/**
 * @swagger
 *  /order/shipping/deliveredby/{user_id}:
 *    get:
 *      summary: Retorna dados do envio
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
 *         description: ID do usuário que está buscando as informações 
 *       
 *      tags: [Order]
 *      description: Retorna dados do envio
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
