const KnexSessionStore = require('connect-session-knex')(session);

const store = new KnexSessionStore({
    knex: require('./config/db'), // Conexão com o banco de dados via Knex
    tablename: 'sessions', // Tabela onde as sessões serão armazenadas
    sidfieldname: 'sid', // Campo de ID da sessão
    createtable: true // Cria a tabela de sessões automaticamente
});

app.use(session({
    store: store,
    secret: 'segredo_super_secreto',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }
}));
