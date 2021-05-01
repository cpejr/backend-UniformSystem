require("dotenv").config();
const { errors } = require('celebrate');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const express = require('express');
const basicAuth = require('express-basic-auth');
const routes = require('./routes');
const { swaggerOptions, getUnauthorizedResponse, myAuthorizer } = require('../swaggerOptions');
const cors = require('cors');

const corsOptions = {
  exposedHeaders: "X-Total-Count",
};



const specs = swaggerJsDoc(swaggerOptions);

const port = process.env.PORT || 3333;

const app = express();

app.use(
  "/api-docs", 
  basicAuth({
    authorizer: myAuthorizer,
    challenge: true,
    unauthorizedResponse: getUnauthorizedResponse
  }),
  swaggerUi.serve, 
  swaggerUi.setup(specs, { explorer: true })
  );
  
  app.use(cors(corsOptions));
  
  app.use(express.json());
  app.use(routes);
  
  app.use(errors());
  
  app.listen(port, () => {
  console.log(__dirname)
  console.log("Listening on port: " + port);
});
