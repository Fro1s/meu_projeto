const express = require('express');
const jogadorRoutes = express.Router(); 
const mysql = require('mysql');
const dbConfig = require('../config/database'); 

jogadorRoutes.get('/cadastroJogador', (req, res) => {
  const connection = mysql.createConnection(dbConfig);

  const query = 'SELECT * FROM equipes';
  connection.query(query, (err, equipes) => {
    connection.end(); // Feche a conexão após a consulta

    if (err) {
      res.status(500).send(err.message);
    } else {
      res.render('cadastroJogador', { equipes: equipes });
    }
  });
});

jogadorRoutes.post('/cadastroJogador', (req, res) => {
  const connection = mysql.createConnection(dbConfig);

  const { nome, numero_camiseta, equipe } = req.body;

  const verificaEquipeQuery = 'SELECT * FROM equipes WHERE nome = ?';
  connection.query(verificaEquipeQuery, [equipe], (err, result) => {
    if (err || result.length === 0) {
      connection.end(); // Feche a conexão em caso de erro ou equipe não encontrada
      return res.status(400).json({ error: 'Equipe inválida. Selecione uma equipe existente.' });
    }
    const cadastraJogadorQuery = 'INSERT INTO jogadores (nome, numero_camiseta, equipe) VALUES (?, ?, ?)';
    connection.query(cadastraJogadorQuery, [nome, numero_camiseta, equipe], (err, result) => {
      connection.end(); // Feche a conexão após a consulta

      if (err) {
        return res.status(500).json({ error: 'Erro ao cadastrar jogador.' });
      }
      res.redirect('/'); 
    });
  });
});

jogadorRoutes.get('/listarJogadores/:equipeId?', (req, res) => {
  const connection = mysql.createConnection(dbConfig);
  const { equipeId } = req.params;
  let query = 'SELECT * FROM jogadores';
  if (equipeId) {
    query += ' WHERE equipe = ?';
  }

  connection.query(query, equipeId ? [equipeId] : [], (err, jogadores) => {
    connection.end(); // Feche a conexão após a consulta

    if (err) {
      console.error('Erro ao buscar jogadores do banco de dados:', err.stack);
      res.status(500).json({ error: 'Erro interno no servidor' });
      return;
    }
    res.json(jogadores);
  });
});

jogadorRoutes.get('/removerJogador/:id', (req, res) => {
  const connection = mysql.createConnection(dbConfig);

  const { id } = req.params;
  const removeJogadorQuery = 'DELETE FROM jogadores WHERE id = ?';
  connection.query(removeJogadorQuery, [id], (err, result) => {
    connection.end(); // Feche a conexão após a consulta

    if (err) {
      console.error('Erro ao remover jogador:', err.stack);
      res.status(500).json({ error: 'Erro ao remover jogador.' });
      return;
    }
    console.log('Jogador removido com sucesso:', id);
    res.redirect('/'); 
  });
});

module.exports = jogadorRoutes;
