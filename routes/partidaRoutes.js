const express = require('express');
const partidaRoutes = express.Router();
const partidaController = require('../controllers/partidaController');

partidaRoutes.get('/cadastroPartida', partidaController);
partidaRoutes.post('/cadastroPartida', partidaController);

module.exports = partidaRoutes;
