const express = require('express');
const bodyParser = require('body-parser');
const jogadorRoutes = require('./routes/jogadorRoutes');
const partidaRoutes = require('./routes/partidaRoutes');
const equipeRoutes = require('./routes/equipesRoutes');
const classificacaoRoutes = require('./routes/classificacaoRoutes');
const mysql = require('mysql');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '156327890',
  database: 'campeonato_futsal',
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados');
    connection.release(); 
  }
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/jogadores', jogadorRoutes);
app.use('/partidas', partidaRoutes);
app.use('/equipes', equipeRoutes);
app.use('/classificacao', classificacaoRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
