const knex = require('knex');
const dotenv = require('dotenv');

dotenv.config();

const db = knex({
    client: 'mysql2', // O cliente que você está usando
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    pool: { min: 0, max: 7 } // Configuração do pool de conexões
});

// Testando a conexão
db.raw('SELECT 1')
    .then(() => {
        console.log('Connected to the MySQL database.');
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });

module.exports = db; // Exporta a instância do Knex
