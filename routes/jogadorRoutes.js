
const express = require('express');
const jogadorRoutes = express.Router();
const jogadorController = require('../controllers/jogadorController');

jogadorRoutes.get('/cadastroJogador', jogadorController);
jogadorRoutes.post('/cadastroJogador', jogadorController);
jogadorRoutes.get('/listarJogadores/:equipeId?', jogadorController);
jogadorRoutes.get('/removerJogador/:id', jogadorController);

module.exports = jogadorRoutes;
