const mysql = require('mysql');

function configDB() {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '156327890',
    database: 'campeonato_futsal',
  });

  connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
    } else {
      console.log('Conectado ao banco de dados');
    }
  });

  return connection;
}

module.exports = configDB;
