const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Configurações do Express
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Importa as rotas
const jogadorRoutes = require('./routes/jogadorRoutes');
const partidaRoutes = require('./routes/partidaRoutes');
const equipeRoutes = require('./routes/equipesRoutes');
const classificacaoRoutes = require('./routes/classificacaoRoutes'); // Adicione esta linha

// Usa as rotas no Express
app.use('/jogadores', jogadorRoutes);
app.use('/partidas', partidaRoutes);
app.use('/equipes', equipeRoutes);
app.use('/classificacao', classificacaoRoutes); // Adicione esta linha

// Inicia o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
