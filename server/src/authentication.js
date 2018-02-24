//var mysql = require('mysql');
const pg = require('pg');
var config = require('../config/mainConfig').config;
//var async = require('async');

module.exports.auth = function (params, callback) {
    console.log(params);
    if (!params.login) return callback('Введите логин');
    if (!params.password) return callback('Введите пароль');

    const client = new pg.Client(config.database.postgresql);
    client.connect();

    var select = "select name, balance from clients where login=$1 and password=$2;";

    client.query(select, [params.login, params.password], function(err, res) {
        client.end();
        if (err) {
            console.error(err);
            return callback('Ошибка обращения к БД');
        }
        if (!res.rows[0]) return callback('Некорректный логин или пароль');
        console.log(res.rows[0]);

        return callback(null, res.rows[0]);
    });
};