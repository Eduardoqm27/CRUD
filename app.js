const express = require('express');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex'); // Importa o KnexSessionStore
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
const Knex = require('knex'); // Importa o Knex

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Inicializa o Knex com a configuração do banco de dados
const knex = Knex({
    client: 'mysql2', // Define o cliente correto
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    }
});

// Cria a tabela de sessões se não existir
const store = new (KnexSessionStore(session))({
    knex: knex, // Passa a instância do Knex
    tablename: 'sessions', // Nome da tabela onde as sessões serão armazenadas
    createtable: true, // Cria a tabela se não existir
    sidfieldname: 'id', // Nome do campo para o ID da sessão
    clearInterval: 1000 * 60 * 60 // Limpa sessões a cada 1 hora
});

// Middleware de sessão
app.use(session({
    secret: 'segredo_super_secreto',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { 
        maxAge: 1000 * 60 * 60 // 1 hora
    }
}));

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rotas
app.use('/', authRoutes);

// Tratamento de 404
app.use((req, res) => {
    res.status(404).render('404');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
