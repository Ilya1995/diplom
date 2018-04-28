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
        console.info('Сервер запущен на порту ' + app.get('port'));
    }
});

app.post(apiPrefix + '/registration', handler.regPatient);
app.post(apiPrefix + '/authentication', handler.auth);
app.get(apiPrefix + '/getLoggedUser', handler.getLoggedUser);
app.get(apiPrefix + '/logout', handler.logout);
app.post(apiPrefix + '/getPatients', handler.getPatients);
app.post(apiPrefix + '/getDoctors', handler.getDoctors);
app.get(apiPrefix + '/getPatient/:id', handler.getPatient);
app.get(apiPrefix + '/getDoctor/:id', handler.getDoctor);
app.get(apiPrefix + '/getDoctorTypes', handler.getDoctorTypes);
app.post(apiPrefix + '/addWorker', handler.addWorker);
app.post(apiPrefix + '/newEntryForAdmission', handler.newEntryForAdmission);
app.get(apiPrefix + '/getNewRecords', handler.getNewRecords);
app.post(apiPrefix + '/deleteRecord', handler.deleteRecord);
app.post(apiPrefix + '/addRecord', handler.addRecord);
app.get(apiPrefix + '/getScheduleDoctor/:id', handler.getScheduleDoctor);
app.delete(apiPrefix + '/deletePatient/:id', handler.deletePatient);