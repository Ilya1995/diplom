const pg = require('pg');
var config = require('../config/mainConfig').config;
var async = require('async');
var moment = require('moment');
var request = require('request');

/**
 * Записать на приём к доктору
 * @param params.recordId - id записи
 * @param params.doctorId - id доктора
 * @param callback
 */
module.exports.addRecord = function (params,callback) {
    console.log(params);
    var that = this;
    const client = new pg.Client(config.database.postgresql);
    client.connect();

    async.waterfall([
        function (callback) {
            var sql = "select user_patient_id, to_char(date_record, 'dd-mm-YYYY HH24:MI:SS') as date, " +
                "patient_doctor_id from new_record " +
                "left JOIN users ON new_record.user_doctor_id = users.id where new_record.id = $1;";
            client.query(sql, [params.recordId], function (err, res) {
                if (err) {
                    console.error(err.message);
                    return callback('Ошибка информации из бд');
                }
                console.log(res.rows[0]);
                return callback(null, res.rows[0]);
            });
        },
        function (record, callback) {
            sendReq('POST', 'newSchedule', {user_patient_id: record.user_patient_id,
                patient_doctor_id: record.patient_doctor_id, date: record.date}, function (err, data) {
                if (err || !data.result) {
                    console.error(err);
                    return callback('Ошибка добавления новой записи в бд');
                }
                return callback(null);
            });
        },
        function (callback) {
            that.deleteRecord({recordId: params.recordId}, function (err) {
                if (err) {
                    return callback(err);
                }
                return callback(null);
            })
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
 * Удалить запись
 * @param params.recordId - id записи
 * @param callback
 */
module.exports.deleteRecord = function (params,callback) {
    console.log(params.recordId);
    const client = new pg.Client(config.database.postgresql);
    client.connect();

    async.waterfall([
        function (callback) {
            var sql = "delete from new_record where id = $1";
            client.query(sql, [params.recordId], function (err) {
                if (err) {
                    console.error(err.message);
                    return callback('Ошибка удаления записи');
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
 * Получить новые записи
 * @param callback
 */
module.exports.getNewRecords = function (callback) {
    const client = new pg.Client(config.database.postgresql);
    client.connect();

    async.waterfall([
        function (callback) {
            var sql = "select new_record.id, p.id as patient_id, p.name as patient, d.id as doctor_id, d.name as doctor, " +
                "to_char(new_record.date_record, 'dd.mm.YYYY HH24:MI') as date from new_record " +
                "left JOIN users as p ON new_record.user_patient_id = p.id " +
                "left JOIN users as d ON new_record.user_doctor_id = d.id;";
            client.query(sql, function (err, res) {
                if (err) {
                    console.error(err.message);
                    return callback('Ошибка добавления новой записи в бд');
                }
                return callback(null, res.rows);
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
 * Добавление новой записи на приём к врачу
 * @param params.patientId - id пациента
 * @param params.doctorId - id доктора
 * @param params.date - желаемая дата записи на приём
 * @param callback
 */
module.exports.newEntryForAdmission = function (params, callback) {
    console.log(params);
    const client = new pg.Client(config.database.postgresql);
    client.connect();

    async.waterfall([
        function (callback) {
            var sql = "INSERT INTO new_record (user_patient_id,user_doctor_id,date_record) VALUES ($1,$2,$3);";
            var date = params.date.selectedDate+' '+params.date.selectedHour+':'+params.date.selectedMinute+':00';
            client.query(sql, [params.patientId, params.doctorId, date], function (err) {
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
                sendReq('POST', 'insertDoctor', {experience: params.experience, doctorTypeId: params.doctorTypeId}, function (err, data) {
                    if (err || !data.result) {
                        console.error(err);
                        return callback('Ошибка добавления нового пациента в бд');
                    }
                    return callback(null, data.data);
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

function sendReq(method, func, body, callback) {
    var primaryUrl = config.module_pers_inf.host+':'+config.module_pers_inf.port+'/api/';
    var reqParams = {
        method: method,
        url: primaryUrl+func,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    body ? reqParams.body = JSON.stringify(body) : null;
    request(reqParams, function (err, res, body) {
        if (err) {
            return callback(err);
        }
        try {
            body = JSON.parse(body);
            console.log(body);
        } catch (e) {
            return callback('Ошибка при парсинге ответа');
        }
        return callback(null, body);
    });
}