require("dotenv").config();
<<<<<<< HEAD
const { errors } = require("celebrate");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const express = require("express");
const routes = require("./routes");
const cors = require("cors");
=======
const { errors } = require('celebrate');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const express = require('express');
const basicAuth = require('express-basic-auth');
const routes = require('./routes');
const { swaggerOptions, getUnauthorizedResponse, myAuthorizer } = require('../swaggerOptions');
const cors = require('cors');
>>>>>>> 153d3376c96c7b407ca6cebf01f45940c8342d89

const corsOptions = {
  exposedHeaders: "X-Total-Count",
};

<<<<<<< HEAD
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "UniformSystem - Swagger",
      description:
        "Documentação do projeto desenvolvido pela equipe Família Pêra em 2020/2 e Tribo Sirius em 2021/1.",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3333",
      },
      {
        url: "https://api.profituniformes.com.br",
      },
    ],
  },
  apis: ["./src/routes/**/documentacao/*.js"],
};
=======

>>>>>>> 153d3376c96c7b407ca6cebf01f45940c8342d89

const specs = swaggerJsDoc(swaggerOptions);

const port = process.env.PORT || 3333;

const app = express();

app.use(
<<<<<<< HEAD
  "/api-docs",
  swaggerUi.serve,
=======
  "/api-docs", 
  basicAuth({
    authorizer: myAuthorizer,
    challenge: true,
    unauthorizedResponse: getUnauthorizedResponse
  }),
  swaggerUi.serve, 
>>>>>>> 153d3376c96c7b407ca6cebf01f45940c8342d89
  swaggerUi.setup(specs, { explorer: true })
);

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.use(errors());

app.listen(port, () => {
  console.log(__dirname);
  console.log("Listening on port: " + port);
});
