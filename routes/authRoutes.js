const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Importando o banco de dados

// Rota para exibir a página de login
router.get('/login', (req, res) => {
    // Verificando se o usuário já está autenticado
    if (req.session.user) {
        return res.redirect('/'); // Redireciona se o usuário já estiver logado
    }
    res.render('login'); // Renderiza a página de login
});

// Rota para processar o login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Verifica se o usuário existe no banco de dados
    const user = await db.query('SELECT * FROM users WHERE username = ?', {
        replacements: [username],
        type: db.QueryTypes.SELECT
    });

    if (user.length && user[0].password === password) { // Simples verificação de senha
        req.session.user = user[0]; // Salva as informações do usuário na sessão
        return res.redirect('/'); // Redireciona após login bem-sucedido
    }

    res.render('login', { error: 'Usuário ou senha inválidos' }); // Mensagem de erro se falhar
});

// Rota para logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/'); // Redireciona em caso de erro
        }
        res.clearCookie('connect.sid'); // Limpa o cookie de sessão
        res.redirect('/login'); // Redireciona para a página de login
    });
});

module.exports = router;
