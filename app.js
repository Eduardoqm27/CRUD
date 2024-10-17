const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session); // Importando o armazenamento de sessão
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const vendaRoutes = require('./routes/vendaRoutes');
const db = require('./config/db'); // Importando o Knex configurado

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do banco de dados para as sessões
const store = new KnexSessionStore({
    knex: db, // Usando a instância do Knex configurada
    tablename: 'sessions', // Tabela onde as sessões serão armazenadas
});

// Configuração da sessão
app.use(session({
    secret: 'segredo_super_secreto', // Mude isso para uma chave secreta segura
    resave: false,
    saveUninitialized: false,
    store: store, // Utiliza o Knex como armazenamento da sessão
    cookie: {
        maxAge: 1000 * 60 * 60 // Sessão expira em 1 hora
    }
}));

// Configuração do motor de visualização
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);

// Configuração de middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Rotas
app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/produtos', produtoRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/vendas', vendaRoutes);

// Middleware para tratamento de 404
app.use((req, res) => {
    res.status(404).render('404');
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

// Início do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
