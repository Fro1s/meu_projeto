const express = require('express');
const classificacaoController = express.Router();
const BancoDados = require('../config/database');

const getClassificacao = async (req, res) => {
  const query = `
    SELECT
      equipes.nome AS time,
      SUM(CASE WHEN partidas.timeCasa = equipes.id THEN partidas.placarCasa ELSE partidas.placarVisitante END) AS golsFeitos,
      SUM(CASE WHEN partidas.timeCasa = equipes.id THEN partidas.placarVisitante ELSE partidas.placarCasa END) AS golsSofridos,
      SUM(CASE WHEN partidas.timeCasa = equipes.id THEN
        CASE WHEN partidas.placarCasa > partidas.placarVisitante THEN 3
             WHEN partidas.placarCasa = partidas.placarVisitante THEN 1
             ELSE 0
        END
      ELSE
        CASE WHEN partidas.placarVisitante > partidas.placarCasa THEN 3
             WHEN partidas.placarVisitante = partidas.placarCasa THEN 1
             ELSE 0
        END
      END) AS pontos
    FROM equipes
    LEFT JOIN partidas ON equipes.id = partidas.timeCasa OR equipes.id = partidas.timeVisitante
    GROUP BY equipes.id
    ORDER BY pontos DESC, golsFeitos - golsSofridos DESC;`;

  try {
    const classificacao = await BancoDados.query(query);

    const equipes = await BancoDados.query('SELECT * FROM equipes');

    res.render('classificacao', { classificacao, equipes });
  } catch (err) {
    console.error('Erro ao executar consulta:', err.stack);
    res.status(500).send('Erro interno no servidor');
  }
};

module.exports = classificacaoController;
module.exports = getClassificacao;

