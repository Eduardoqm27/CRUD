const methodOverride = require('method-override');

// Substituição de método HTTP
app.use(methodOverride('_method'));
