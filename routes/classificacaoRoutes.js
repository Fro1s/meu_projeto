const express = require('express');
const classificacaoRoutes = express.Router();
const getClassificacao = require('../controllers/classificacaoController');

classificacaoRoutes.get('/', getClassificacao);

module.exports = classificacaoRoutes;
