const pg = require('pg');
var config = require('../config/mainConfig').config;
var async = require('async');
var _ = require('underscore');



/**
 * Получение пациента
 * @param params.id - id пациента
 * @param callback
 */
module.exports.getPatient = function (params, callback) {
    const client = new pg.Client(config.database.postgresql);
    client.connect();

    async.waterfall([
        function (callback) {
            var sql = "select users.id, users.name, phone, email, to_char(date_reg, 'dd.mm.YYYY') as date, roles.name, " +
                "patient.serial, patient.number from users INNER JOIN roles ON users.role_id = roles.id " +
                "INNER JOIN patient ON users.patient_doctor_id = patient.id where role_id = 2 and " +
                "patient_doctor_id is not null  and users.id = $1;";
            client.query(sql, [params.id], function (err, res) {
                if (err) {
                    console.error(err.message);
                    return callback('Ошибка чтения клиентов');
                }
                return callback(null, res.rows[0]);
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
 * Получение общей информации о пациентах
 * @param callback
 */
module.exports.getPatients = function (params, callback) {
    console.log(params);
    const client = new pg.Client(config.database.postgresql);
    client.connect();
    var sql = "select id, name, phone, email, to_char(date_reg, 'dd.mm.YYYY') as date from users where role_id = 2 " +
        "and patient_doctor_id is not null and name ilike $1;";
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