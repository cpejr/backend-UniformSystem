const basicAuth = require('express-basic-auth');

const swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "UniformSystem - Swagger",
        description: "Documentação do projeto desenvolvido pela equipe Família Pêra em 2020/2 e Tribo Sirius em 2021/1.",
        version: "1.0.0"
      },
      servers: [
        {
          url: "http://localhost:3333"
        },
        {
          url: "https://api.profituniformes.com.br"
        },
      ],
    },
    apis: [ "./src/routes/**/documentacao/*.js"],
    
  }

  function getUnauthorizedResponse(req) {
    return req.auth
        ? 'Unauthorized.'
        : 'No credentials provided.'
}

function myAuthorizer(username, password) {
    const userMatches = basicAuth.safeCompare(username, process.env.SWAGGER_USERNAME)
    const passwordMatches = basicAuth.safeCompare(password, process.env.SWAGGER_PASSWORD)
 
    return userMatches & passwordMatches
}

module.exports = { swaggerOptions, getUnauthorizedResponse, myAuthorizer};