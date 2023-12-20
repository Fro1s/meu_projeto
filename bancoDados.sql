CREATE DATABASE IF NOT EXISTS campeonato_futsal;
USE campeonato_futsal;

CREATE TABLE IF NOT EXISTS jogadores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  numero_camiseta INT NOT NULL,
  equipe VARCHAR(255) NOT NULL,
);

CREATE TABLE IF NOT EXISTS equipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
);

CREATE TABLE IF NOT EXISTS partidas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    data DATE,
    horarioInicio TIME,
    horarioTermino TIME,
    timeCasa INT,
    timeVisitante INT,
    placarCasa INT,
    placarVisitante INT,
    FOREIGN KEY (timeCasa) REFERENCES equipes(id),
    FOREIGN KEY (timeVisitante) REFERENCES equipes(id)
);
