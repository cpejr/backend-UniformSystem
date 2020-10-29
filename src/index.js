require("dotenv").config();
const { errors } = require('celebrate');

const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const corsOptions = {
  exposedHeaders: 'X-Total-Count',
};

const port = process.env.PORT || 3333;

const app = express();

app.use(cors(corsOptions));

app.use(express.json());
app.use(routes);

app.use(errors());

app.listen(port, () => {
  console.log("Listening on port: " + port);
});