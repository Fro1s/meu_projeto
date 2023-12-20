const express = require('express');
const equipeController = express.Router();
const BancoDados = require('../config/database');

equipeController.get('/cadastroEquipes', (req, res) => {
  BancoDados.query('SELECT * FROM equipes', (err, equipes) => {
    if (err) {
      console.error('Erro ao buscar equipes do banco de dados:', err.stack);
      res.status(500).send('Erro interno no servidor');
      return;
    }
    res.render('cadastroEquipes', { equipes });
  });
});

equipeController.post('/cadastroEquipes', (req, res) => {
  const { nomeEquipe } = req.body;

  const verificaEquipeExistenteQuery = 'SELECT * FROM equipes WHERE nome = ?';
  BancoDados.query(verificaEquipeExistenteQuery, [nomeEquipe], (err, result) => {
    if (result.length > 0) {
      console.log('Equipe com o mesmo nome já existe:', nomeEquipe);
      res.status(400).json({ error: 'Equipe com o mesmo nome já cadastrada.' });
    } else {
      const cadastraEquipeQuery = 'INSERT INTO equipes (nome) VALUES (?)';
      BancoDados.query(cadastraEquipeQuery, [nomeEquipe], (err, result) => {
        if (err) {
          console.error('Erro ao inserir equipe no banco de dados:', err.stack);
          res.status(500).send('Erro interno no servidor');
          return;
        }
        console.log('Equipe inserida com sucesso:', result.insertId);
        res.redirect('/cadastroEquipes');
      });
    }
  });
});

equipeController.get('/removerEquipe/:equipeId', (req, res) => {
  const { equipeId } = req.params;
  const removeEquipeQuery = 'DELETE FROM equipes WHERE id = ?';

  BancoDados.query(removeEquipeQuery, [equipeId], (err, result) => {
    if (err) {
      console.error('Erro ao remover equipe:', err.stack);
      res.status(500).json({ error: 'Erro ao remover equipe.' });
      return;
    }
    console.log('Equipe removida com sucesso:', equipeId);
    res.redirect('/cadastroEquipes');
  });
});

module.exports = equipeController;
