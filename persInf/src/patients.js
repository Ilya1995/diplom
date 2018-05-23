const pg = require('pg');
var config = require('../config/mainConfig').config;
var async = require('async');

/**
 * Добавление пациента
 * @param params.serial - серия паспорта
 * @param params.number - номер паспорта
 * @param callback
 */
module.exports.insertPatient = function (params, callback) {
    const client = new pg.Client(config.database.postgresql);
    client.connect();
    var sql = "INSERT INTO patient (serial, number) values(pgp_sym_encrypt($1, $2, 'compress-algo=0, cipher-algo=grasshopper'), " +
        "pgp_sym_encrypt($3, $4, 'compress-algo=0, cipher-algo=grasshopper')) RETURNING id";
    client.query(sql, [params.serial, config.key, params.number, config.key], function (err, req) {
        client.end();
        if (err) {
            console.error(err.message);
            return callback('Ошибка добавления нового пациента в бд');
        }
        console.log(req.rows[0]);
        return callback(null, req.rows[0].id);
    });
};

/**
 * Удаление пациента из БД
 * @param params.id - id пациента
 * @param callback
 */
module.exports.deletePatient = function (params, callback) {
    const client = new pg.Client(config.database.postgresql);
    client.connect();

    async.waterfall([
        function (callback) {
            var sql = "delete from patient where id = (select patient_doctor_id from users where id = $1);";
            client.query(sql, [params.id], function (err) {
                if (err) {
                    console.error(err.message);
                    return callback('Ошибка при удалении пациента');
                }
                return callback(null);
            });
        },
        function (callback) {
            var sql = "delete from users where id = $1;";
            client.query(sql, [params.id], function (err) {
                if (err) {
                    console.error(err.message);
                    return callback('Ошибка при удалении пациента');
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

/**
 * Получение пациента
 * @param params.id - id пациента
 * @param callback
 */
module.exports.getPatient = function (params, callback) {
    const client = new pg.Client(config.database.postgresql);
    client.connect();
    var sql = "select users.id, users.name, phone, email, to_char(date_reg, 'dd.mm.YYYY') as date, roles.name, " +
        "pgp_sym_decrypt(patient.serial,  $1, 'compress-algo=0, cipher-algo=grasshopper') as serial, " +
        "pgp_sym_decrypt(patient.number,  $2, 'compress-algo=0, cipher-algo=grasshopper') as number " +
        "from users INNER JOIN roles ON users.role_id = roles.id " +
        "INNER JOIN patient ON users.patient_doctor_id = patient.id where role_id = 2 and " +
        "patient_doctor_id is not null  and users.id = $3;";
    client.query(sql, [config.key,config.key,params.id], function (err, res) {
        client.end();
        if (err) {
            console.error(err.message);
            return callback('Ошибка чтения клиентов');
        }
        return callback(null, res.rows[0]);
    });
};

/**
 * Получение информации о пациентах
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