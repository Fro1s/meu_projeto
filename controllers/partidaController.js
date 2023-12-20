const express = require('express');
const partidaController = express.Router();
const BancoDados = require('../config/database');

partidaController.get('/cadastroPartida', (req, res) => {
  BancoDados.query('SELECT * FROM equipes', (err, equipes) => {
    if (err) {
      console.error('Erro ao buscar equipes do banco de dados:', err.stack);
      res.status(500).send('Erro interno no servidor');
      return;
    }
    res.render('cadastroPartida', { equipes });
  });
});

partidaController.post('/cadastroPartida', (req, res) => {
  const { data, horarioInicio, horarioTermino, timeCasa, timeVisitante, placarCasa, placarVisitante } = req.body;
  const cadastraPartidaQuery = 'INSERT INTO partidas (data, horarioInicio, horarioTermino, timeCasa, timeVisitante, placarCasa, placarVisitante) VALUES (?, ?, ?, ?, ?, ?, ?)';

  BancoDados.query(cadastraPartidaQuery, [data, horarioInicio, horarioTermino, timeCasa, timeVisitante, placarCasa, placarVisitante], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar partida:', err.stack);
      res.status(500).json({ error: 'Erro ao cadastrar partida.' });
      return;
    }
    console.log('Partida cadastrada com sucesso:', result.insertId);
    res.redirect('/');
  });
});

module.exports = partidaController;
