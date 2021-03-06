//var mysql = require('mysql');
const pg = require('pg');
const config = require('../config/mainConfig').config;
const async = require('async');

module.exports.auth = function (params, callback) {
    console.log(params);
    if (!params.login || !params.password) return callback('Введите логин и пароль');

    const client = new pg.Client(config.database.postgresql);
    client.connect();

    async.waterfall([
        function (callback) {
            var select = "select id, name from users where phone=$1 and password=$2;";

            client.query(select, [params.login, params.password], function(err, res) {
                if (err) {
                    console.error(err);
                    return callback('Ошибка обращения к БД');
                }
                if (!res.rows[0]) return callback('Некорректный логин или пароль');

                return callback(null, res.rows[0]);
            });
        },
        function (data, callback) {
            var select = "SELECT roles.name FROM users INNER JOIN roles ON users.role_id = roles.id where users.id = $1;";
            client.query(select, [data.id], function(err, res) {
                if (err) {
                    console.error(err);
                    return callback('Ошибка обращения к БД');
                }
                data.roleName = res.rows[0].name;
                return callback(null, data);
            });
        }
    ], function (err, data) {
        client.end();
        if (err) {
            console.error(err);
            return callback(err);
        }
        return callback(null, data);
    });
};