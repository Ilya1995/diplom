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
        console.info('Сервер с персональными данными запущен на порту ' + app.get('port'));
    }
});

app.post(apiPrefix + '/insertPatient', handler.insertPatient);
app.post(apiPrefix + '/newSchedule', handler.newSchedule);
app.post(apiPrefix + '/insertDoctor', handler.insertDoctor);
app.get(apiPrefix + '/getScheduleDoctor/:id', handler.getScheduleDoctor);
app.get(apiPrefix + '/getDoctorTypes', handler.getDoctorTypes);
app.get(apiPrefix + '/getDoctor/:id', handler.getDoctor);
app.post(apiPrefix + '/getDoctors', handler.getDoctors);
app.delete(apiPrefix + '/deletePatient/:id', handler.deletePatient);
app.get(apiPrefix + '/getPatient/:id', handler.getPatient);
app.post(apiPrefix + '/getPatients', handler.getPatients);