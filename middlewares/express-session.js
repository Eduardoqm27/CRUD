const session = require('express-session');

// Configuração da sessão
app.use(session({
    secret: 'segredo_super_secreto', // Chave secreta para criptografar a sessão
    resave: false, // Não salvar sessão se não houver modificações
    saveUninitialized: false, // Não criar sessão vazia
    cookie: { maxAge: 1000 * 60 * 60 } // Define a validade de 1 hora
}));
