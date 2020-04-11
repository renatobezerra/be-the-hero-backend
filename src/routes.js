'use strict'

const express = require('express');
const routes = express.Router();
const OngController = require('./controller/OngController');
const IncidentController = require('./controller/IncidentController');

// Ongs
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

// Incident
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;
