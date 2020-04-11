'use strict'

const express = require('express');
const routes = express.Router();

routes.post('/users', (req, res) => {
  console.log(req.body);

  return res.json({
    evento: 'Semana Omnistack 11.0',
    aluno: 'Carlos Eduardo',
  });
});

module.exports = routes;
