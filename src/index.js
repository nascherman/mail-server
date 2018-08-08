const express = require('express');
const bodyParser = require('body-parser');
const swaggerize = require('swaggerize-express');
const api = require('./config/swagger');

const APP_PORT = 4545;
const handlers = './handlers';

const app = express();

app.use(bodyParser.json());
app.use('/', swaggerize({api, handlers}));

// 404 response
app.use((req, res, next) => {
   res.status(404).send('API endpoint not found');
});

// Error response
app.use((err, req, res, next) => {
    if (err) {
        res.status(err.code || 500)
            .send(err.message || 'General error');
    } else {
        next(res);
    }
});

app.listen(APP_PORT, (res, err) => {
    console.log(`App listening on port ${APP_PORT}`);
});
