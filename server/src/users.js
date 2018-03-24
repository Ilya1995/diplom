//var mysql = require('mysql');
const pg = require('pg');
var config = require('../config/mainConfig').config;
var async = require('async');

/**
 * Получает из БД все доступные роли
 * @param callback
 */
module.exports.getRoles = function (callback) {
    const client = new pg.Client(config.database.postgresql);
    client.connect();
    var sql = "select id, balance, name, email from clients;";
    client.query(sql, function (err, res) {
        client.end();
        console.error(res.rows);
        if (err) {
            console.error(err.message);
            return callback('Ошибка чтения клиентов');
        }
        return callback(null, res.rows);
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
    var sql = "select id, balance, name, email, to_char(date_reg, 'dd-mm-YYYY') as date from clients where name ilike $1;";
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