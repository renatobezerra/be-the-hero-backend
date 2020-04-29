'use strict'

const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const routes = express.Router();
const OngController = require('./controller/OngController');
const IncidentController = require('./controller/IncidentController');
const ProfileController = require('./controller/ProfileController');
const SessionController = require('./controller/SessionController');


// Config Validators
const ongPostValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  })
});

const incidentPostValidation = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required().length(8)
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    value: Joi.number().required(),
    title: Joi.string().min(5).max(100).required(),
    description: Joi.string().min(20).max(3000).required(),
  })
});

const incidentGetValidatiion = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().integer(),
    limit: Joi.number().integer()
  })
});

const incidentDeleteValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
});

const profileGetValidation = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required().length(8)
  }).unknown()
});


// Ongs
routes.get('/ongs', OngController.index);
routes.post('/ongs', ongPostValidation, OngController.validEmail, OngController.create);

// Incident
routes.get('/incidents', incidentGetValidatiion, IncidentController.index);
routes.post('/incidents', incidentPostValidation, IncidentController.create);
routes.delete('/incidents/:id', incidentDeleteValidation, IncidentController.delete);

// Profile
routes.get('/profile', profileGetValidation, ProfileController.index);

// Session
routes.post('/session', SessionController.create);

module.exports = routes;
