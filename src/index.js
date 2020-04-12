'use strict'

const express = require("express");
const app = express();
const cors = require('cors');
const routes = require('../src/routes');

const port = process.env.PORT || 3000;

app.disable('x-powered-by');

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
