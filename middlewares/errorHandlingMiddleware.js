// middlewares/errorHandlingMiddleware.js

function errorHandling(err, req, res, next) {
    console.error(err.stack); // Exibe o erro no console
    res.status(500).send('Algo deu errado!'); // Envia mensagem de erro
}

module.exports = errorHandling;
