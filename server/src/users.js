const pg = require('pg');
var config = require('../config/mainConfig').config;
var async = require('async');
var moment = require('moment');
var _ = require('underscore');


/**
 * Добавление нового работника
 * @param params.phone - номер телефона
 * @param params.pass - пароль
 * @param params.name - ФИО
 * @param params.email - емэйл
 * @param params.experience - стаж работы
 * @param params.doctorTypeId - id специализации доктора
 * @param params.roleId - id роли
 * @param callback
 */
module.exports.addWorker = function (params, callback) {
    console.log(params);
    const client = new pg.Client(config.database.postgresql);
    client.connect();

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
            if (params.roleId!==1) {
                var sql = "INSERT INTO doctor (experience, doctor_type_id) values($1, $2) RETURNING id";
                client.query(sql, [params.experience, params.doctorTypeId], function (err, req) {
                    if (err) {
                        console.error(err.message);
                        return callback('Ошибка добавления нового пациента в бд');
                    }
                    console.log(req.rows[0]);
                    return callback(null, req.rows[0].id);
                });
            } else {
                return callback(null, null);
            }
        },
        function (doctorId, callback) {
            var sql = "INSERT INTO users (role_id, patient_doctor_id, phone, password, name, email, date_reg) " +
                "values($1, $2, $3, $4, $5, $6, $7)";
            client.query(sql, [params.roleId, doctorId || null, params.phone, params.pass, params.name, params.email,
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