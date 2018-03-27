const pg = require('pg');
var config = require('../config/mainConfig').config;
var async = require('async');

/**
 * Получение клиента
 * @param params.id - id клиента
 * @param callback
 */
module.exports.getClient = function (params, callback) {
    const client = new pg.Client(config.database.postgresql);
    client.connect();

    async.waterfall([
        function (callback) {
            var sql = "select id, name, serial, number, phone, email, to_char(date_reg, 'dd-mm-YYYY') as date from clients where id = $1;";
            client.query(sql, [params.id], function (err, res) {
                if (err) {
                    console.error(err.message);
                    return callback('Ошибка чтения клиентов');
                }
                return callback(null, res.rows[0]);
            });
        },
        function (data, callback) {
            var select = "SELECT roles.id, roles.name FROM clients_roles " +
                "INNER JOIN roles ON clients_roles.role_id = roles.id " +
                "where clients_roles.client_id = $1;";
            client.query(select, [params.id], function(err, res) {
                if (err) {
                    console.error(err);
                    return callback('Ошибка обращения к БД');
                }
                data.roles = res.rows;
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

/**
 * Получение клиентов
 * @param callback
 */
module.exports.getClients = function (params, callback) {
    console.log(params);
    const client = new pg.Client(config.database.postgresql);
    client.connect();
    var sql = "select id, name, phone, email, to_char(date_reg, 'dd-mm-YYYY') as date from clients where name ilike $1;";
    client.query(sql, ['%'+params.name+'%'], function (err, res) {
        client.end();
        if (err) {
            console.error(err.message);
            return callback('Ошибка чтения клиентов');
        }
        console.error(res.rows);
        return callback(null, res.rows);
    });
};