const pg = require('pg');
var config = require('../config/mainConfig').config;
var async = require('async');
var _ = require('underscore');

/**
 * Получение специализаций врачей
 * @param callback
 */
module.exports.getDoctorTypes = function (callback) {
    const client = new pg.Client(config.database.postgresql);
    client.connect();
    var sql = "select * from doctor_type;";
    client.query(sql, function (err, res) {
        client.end();
        if (err) {
            console.error(err.message);
            return callback('Ошибка чтения клиентов');
        }
        console.error(res.rows);
        return callback(null, res.rows);
    });
};

/**
 * Получение общей информации о докторах
 * @param callback
 */
module.exports.getDoctors = function (params, callback) {
    console.log(params);
    const client = new pg.Client(config.database.postgresql);
    client.connect();
    var sql = "select users.id, users.name, phone, email, to_char(date_reg, 'dd.mm.YYYY') as date, " +
        "doctor.experience, doctor_type.name as type_name from users " +
        "INNER JOIN doctor ON users.patient_doctor_id = doctor.id " +
        "INNER JOIN doctor_type ON doctor.doctor_type_id = doctor_type.id " +
        "where role_id = 3 and patient_doctor_id is not null and users.name ilike $1;";
    client.query(sql, ['%'+params.name+'%'], function (err, res) {
        client.end();
        if (err) {
            console.error(err.message);
            return callback('Ошибка чтения докторов');
        }
        console.error(res.rows);
        return callback(null, res.rows);
    });
};