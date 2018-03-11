const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const config = require('./config/mainConfig').config;
const handler = require('./src/handler');
const apiPrefix = '/api';
require('./src/console.js');

app.set('host', config.listen.host);
app.set('port', process.env.port || config.listen.port);
app.use(cookieParser());
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.listen(app.get('port'), app.get('host'), function (err) {
    if (err) {
        console.error('Ошибка при запуске сервера', err);
    } else {
        console.info('Сервер API_GW запущен на порту ' + app.get('port'));
    }
});

app.post(apiPrefix + '/registration', handler.regClient);
app.post(apiPrefix + '/authentication', handler.auth);
app.get(apiPrefix + '/getLoggedUser', handler.getLoggedUser);
app.get(apiPrefix + '/logout', handler.logout);