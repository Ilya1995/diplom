"use strict";
var config = {
    name: 'API_GW',
    listen: {
        host: '127.0.0.1',
        port: 3550
    },
    database: {
        mysql: {
            host: '127.0.0.1',          //хост с базами данных
            user: 'root',               //учетка на сервере БД
            database: 'myDatabase',     //имя БД
            password: '7991',           //пароль к БД
            insecureAuth: true,         //разрешение подключения без SSL
            multipleStatements: true    //разрешение передачи нескольких запросов в одном, разделенных знаком ";"
        },
        postgresql: {
            user: 'postgres',
            host: 'localhost',
            database: 'postgres',
            password: '7991',
            port: 5432
        }
    },
    logLevel: 4 //one of log levels error(0)-warning-log-info-debug-trace(5)
};
config.env=process.env.NODE_ENV || 'dev';
exports.config = config;