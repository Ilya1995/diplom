//var mysql = require('mysql');
const pg = require('pg');
var config = require('../config/mainConfig').config;
var async = require('async');
var moment = require('moment');

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
            var sql = "INSERT INTO clients (balance, name, email, login, password, date_reg) values(null, $1, $2, $3, $4, $5) RETURNING id";
            client.query(sql, [params.name, params.email, params.login, params.pass1, moment().format('DD-MM-Y H:mm:ss')], function (err, req) {
                if (err) {
                    console.error(err.message);
                    return callback('Ошибка добавления нового клиента в бд');
                }
                console.log(req.rows[0]);
                return callback(null, req.rows[0]);
            });
        },
        function (data, callback) {
            var sql = "INSERT INTO clients_roles (client_id, role_id) values($1, $2);";
            client.query(sql, [data.id, 2], function (err) {
                if (err) {
                    console.error(err.message);
                    return callback('Ошибка при добавлении роли');
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