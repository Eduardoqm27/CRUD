const bodyParser = require('body-parser');

// Parsing para JSON
app.use(bodyParser.json());

// Parsing para dados de formulário
app.use(bodyParser.urlencoded({ extended: true }));
