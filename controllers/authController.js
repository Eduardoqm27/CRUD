const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

// Exibir formulário de login
exports.getLogin = (req, res) => {
    res.render('login', { message: null });
};

// Lidar com a autenticação de login
exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findByUsername(username);

    if (!user) {
        return res.render('login', { message: 'Usuário não encontrado!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.render('login', { message: 'Senha incorreta!' });
    }

    req.session.userId = user.id;
    res.redirect('/dashboard');
};

// Destruir sessão ao fazer logout
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/login');
    });
};
