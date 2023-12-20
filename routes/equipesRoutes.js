const express = require('express');
const equipesRoutes = express.Router();
const equipeController = require('../controllers/equipeController');

equipesRoutes.get('/cadastroEquipes', equipeController);
equipesRoutes.post('/cadastroEquipes', equipeController);
equipesRoutes.get('/removerEquipe/:equipeId', equipeController);

module.exports = equipesRoutes;
