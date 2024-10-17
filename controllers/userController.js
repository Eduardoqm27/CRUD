// controllers/userController.js
const db = require('../config/db'); // Importa a conexão com o banco de dados

// Renderiza o formulário de login
exports.loginForm = (req, res) => {
    res.render('login'); // Renderiza a view de login (views/login.ejs)
};

// Processa o login do usuário
exports.login = (req, res) => {
    const { username, password } = req.body;

    // Verifica se o usuário existe no banco de dados
    db('users').where({ username, password }).first()
        .then(user => {
            if (user) {
                // Se o usuário existir, armazena os dados da sessão
                req.session.userId = user.id;  // Armazena o ID do usuário na sessão
                req.session.username = user.username; // Armazena o nome de usuário na sessão
                req.session.role = user.role; // Armazena o papel do usuário (admin ou user)
                res.redirect('/'); // Redireciona para a página inicial após login bem-sucedido
            } else {
                // Se as credenciais forem inválidas, renderiza o formulário com uma mensagem de erro
                res.render('login', { error: 'Usuário ou senha inválidos!' });
            }
        })
        .catch(err => {
            console.error('Erro ao tentar fazer login:', err);
            res.status(500).send('Erro interno ao processar o login. Tente novamente mais tarde.');
        });
};

// Realiza o logout do usuário
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Erro ao realizar logout:', err);
            return res.redirect('/'); // Em caso de erro no logout, redireciona para a página inicial
        }
        res.clearCookie('connect.sid'); // Limpa o cookie da sessão
        res.redirect('/users/login'); // Redireciona para a página de login após o logout
    });
};

// Middleware para verificar se o usuário está autenticado
exports.isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next(); // Se o usuário estiver logado, permite continuar
    }
    res.redirect('/users/login'); // Se não estiver autenticado, redireciona para o login
};

// Middleware para verificar se o usuário é admin
exports.isAdmin = (req, res, next) => {
    if (req.session.role === 'admin') {
        return next(); // Se o usuário for admin, permite continuar
    }
    res.status(403).send('Acesso negado: Você não tem permissão para acessar esta página.'); // Acesso negado
};
