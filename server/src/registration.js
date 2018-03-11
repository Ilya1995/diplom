//var mysql = require('mysql');
const pg = require('pg');
var config = require('../config/mainConfig').config;
var async = require('async');

/**
 * Регистрация нового клиента
 * @param params.login - логин
 * @param params.pass1 - пароль
 * @param params.pass2 - пароль
 * @param params.name - имя
 * @param params.email - емэйл
 * @param callback
 */
module.exports.regClient = function (params, callback) {
    const client = new pg.Client(config.database.postgresql);
    client.connect();

    if ((!params.login || !params.pass1)) return callback('Не указаны логин или пароль');
    if (params.pass1 !== params.pass2) return callback('Указанные пароли не совпадают');

    async.waterfall([
        function (callback) {
            var sql = "SELECT id FROM clients WHERE login = $1";
            client.query(sql, [params.login], function (err, res) {
                if (res.rows.length) {
                    return callback('Пользователь с таким логином уже зарегистрирован');
                }
                if (err) {
                    console.error(err.message);
                    return callback('Ошибка добавления нового клиента в бд');
                }
                return callback();
            });
        },
        function (callback) {
            var sql = "INSERT INTO clients (balance, name, email, login, password) values(null, $1, $2, $3, $4)";
            client.query(sql, [params.name, params.email, params.login, params.pass1], function (err) {
                if (err) {
                    console.error(err.message);
                    return callback('Ошибка добавления нового клиента в бд');
                }
                return callback(null);
            });
        }
    ], function (err) {
        client.end();
        if (err) {
            console.error(err);
            return callback(err);
        }
        return callback(null);
    });
};