// middlewares/error404Middleware.js

function error404(req, res) {
    res.status(404).render('404'); // Renderiza uma página de erro 404
}

module.exports = error404;
