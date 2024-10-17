// middlewares/authMiddleware.js

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next(); // Se o usuário estiver autenticado, prossegue
    } else {
        res.redirect('/login'); // Se não estiver autenticado, redireciona para a página de login
    }
}

module.exports = isAuthenticated;
