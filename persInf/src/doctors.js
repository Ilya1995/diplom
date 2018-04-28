const pg = require('pg');
var config = require('../config/mainConfig').config;
var async = require('async');

/**
 * Добавить новую запись в расписание доктора
 * @param params.user_patient_id - id пациента
 * @param params.patient_doctor_id - id доктора
 * @param params.date - дата записи на приём
 * @param callback
 */
module.exports.newSchedule = function (params, callback) {
    console.log(params);
    const client = new pg.Client(config.database.postgresql);
    client.connect();
    async.waterfall([
        function (callback) {
            var sql = "INSERT INTO schedule (user_patient_id, date_record) VALUES ($1,$2) RETURNING id;";
            client.query(sql, [params.user_patient_id, params.date], function (err, res) {
                if (err) {
                    console.error(err.message);
                    return callback('Ошибка добавления новой записи в бд');
                }
                return callback(null, res.rows[0].id);
            });
        },
        function (scheduleId, callback) {
            var sql = "INSERT INTO doctors_schedules (doctor_id,schedule_id) VALUES ($1,$2);";
            client.query(sql, [params.patient_doctor_id, scheduleId], function (err) {
                if (err) {
                    console.error(err.message);
                    return callback('Ошибка добавления новой записи в бд');
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
 * Добавление доктора
 * @param params.experience - стаж работы
 * @param params.doctorTypeId - id специализации доктора
 * @param callback
 */
module.exports.insertDoctor = function (params, callback) {
    const client = new pg.Client(config.database.postgresql);
    client.connect();
    var sql = "INSERT INTO doctor (experience, doctor_type_id) values($1, $2) RETURNING id";
    client.query(sql, [params.experience, params.doctorTypeId], function (err, req) {
        client.end();
        if (err) {
            console.error(err.message);
            return callback('Ошибка добавления нового пациента в бд');
        }
        return callback(null, req.rows[0].id);
    });
};


/**
 * Получение расписания доктора
 * @param callback
 */
module.exports.getScheduleDoctor = function (params, callback) {
    console.log(params);
    const client = new pg.Client(config.database.postgresql);
    client.connect();
    var sql = "select p.name, to_char(schedule.date_record, 'dd.mm.YYYY HH24:MI') as date from users " +
        "INNER JOIN doctor ON users.patient_doctor_id = doctor.id " +
        "INNER JOIN doctors_schedules ON doctor.id = doctors_schedules.doctor_id " +
        "INNER JOIN schedule ON doctors_schedules.schedule_id = schedule.id " +
        "INNER JOIN users as p ON schedule.user_patient_id = p.id " +
        "where users.role_id = 3 and users.patient_doctor_id is not null and users.id = $1;";
    client.query(sql, [params.id], function (err, res) {
        client.end();
        if (err) {
            console.error(err.message);
            return callback('Ошибка чтения докторов');
        }
        console.error(res.rows);
        return callback(null, res.rows);
    });
};

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
 * Получение информации о конкрутном докторе
 * @param callback
 */
module.exports.getDoctor = function (params, callback) {
    console.log(params);
    const client = new pg.Client(config.database.postgresql);
    client.connect();
    var sql = "select users.id, users.name, phone, email, to_char(date_reg, 'dd.mm.YYYY') as date, " +
        "doctor.experience, doctor_type.name as type_name from users " +
        "INNER JOIN doctor ON users.patient_doctor_id = doctor.id " +
        "INNER JOIN doctor_type ON doctor.doctor_type_id = doctor_type.id " +
        "where role_id = 3 and patient_doctor_id is not null and users.id = $1;";
    client.query(sql, [params.id], function (err, res) {
        client.end();
        if (err) {
            console.error(err.message);
            return callback('Ошибка чтения докторов');
        }
        console.error(res.rows);
        return callback(null, res.rows[0]);
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
    var sql = "select users.id, users.name, doctor.experience, doctor_type.name as type_name from users " +
        "INNER JOIN doctor ON users.patient_doctor_id = doctor.id " +
        "INNER JOIN doctor_type ON doctor.doctor_type_id = doctor_type.id " +
        "where role_id = 3 and patient_doctor_id is not null and users.name ilike $1;";
    client.query(sql, ['%'+params.name+'%'], function (err, res) {
        client.end();
        if (err) {
            console.error(err.message);
            return callback('Ошибка чтения докторов');
        }
        console.log(res.rows);
        return callback(null, res.rows);
    });
};