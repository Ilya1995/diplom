//var mysql = require('mysql');
const pg = require('pg');
var config = require('../config/mainConfig').config;
var async = require('async');
var moment = require('moment');

/**
 * Регистрация нового клиента
 * @param params.phone - номер телефона
 * @param params.pass - пароль
 * @param params.name - ФИО
 * @param params.email - емэйл
 * @param params.serial - серия паспорта
 * @param params.number - номер паспорта
 * @param callback
 */
module.exports.regPatient = function (params, callback) {
    const client = new pg.Client(config.database.postgresql);
    client.connect();

    if ((!params.phone || !params.pass)) return callback('Не указаны логин или пароль');

    async.waterfall([
        function (callback) {
            var sql = "SELECT id FROM users WHERE phone = $1";
            client.query(sql, [params.phone], function (err, res) {
                if (res.rows.length) {
                    return callback('Пользователь с таким номером телефона уже зарегистрирован');
                }
                if (err) {
                    console.error(err.message);
                    return callback('Ошибка добавления нового клиента в бд');
                }
                return callback();
            });
        },
        function (callback) {
            var sql = "INSERT INTO patient (serial, number) values($1, $2) RETURNING id";
            client.query(sql, [params.serial, params.number], function (err, req) {
                if (err) {
                    console.error(err.message);
                    return callback('Ошибка добавления нового пациента в бд');
                }
                console.log(req.rows[0]);
                return callback(null, req.rows[0].id);
            });
        },
        function (patientId, callback) {
            var sql = "INSERT INTO users (role_id, patient_doctor_id, phone, password, name, email, date_reg) " +
                "values($1, $2, $3, $4, $5, $6, $7)";
            client.query(sql, [2, patientId, params.phone, params.pass, params.name, params.email,
                moment().format('DD-MM-Y H:mm:ss')], function (err) {
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