'use strict'

const express = require('express');
const routes = express.Router();
const OngController = require('./controller/OngController');
const IncidentController = require('./controller/IncidentController');
const ProfileController = require('./controller/ProfileController');
const SessionController = require('./controller/SessionController');

// Ongs
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

// Incident
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

// Profile
routes.get('/profile', ProfileController.index);

// Session
routes.post('/session', SessionController.create);

module.exports = routes;
