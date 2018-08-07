const express = require('express');
const bodyParser = require('body-parser');
const swaggerize = require('swaggerize-express');
const api = require('./config/swagger');

const APP_PORT = 4545;

const app = express();

app.use('/', swaggerize({
    api,
    handlers: './handlers'
}));

// 404 response
app.use((req, res, next) => {
   next();
});

app.listen(APP_PORT, (res, err) => {
    console.log(`App listening on port ${APP_PORT}`);
});
