'use strict'

const express = require("express");
const app = express();
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('../src/routes');

const port = process.env.PORT || 3333;

app.disable('x-powered-by');

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
