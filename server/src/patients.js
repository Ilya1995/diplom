var config = require('../config/mainConfig').config;
var request = require('request');

/**
 * Удаление пациента из БД
 * @param params.id - id пациента
 * @param callback
 */
module.exports.deletePatient = function (params, callback) {
    sendReq('DELETE', 'deletePatient/'+params.id, null, function (err, data) {
        if (err || !data.result) {
            console.error(err);
            return callback('Ошибка при удалении записи из бд');
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
    sendReq('GET', 'getPatient/'+params.id, null, function (err, data) {
        if (err || !data.result) {
            console.error(err);
            return callback('Ошибка при получении записи из бд');
        }
        return callback(null, data.data);
    });
};

/**
 * Получение общей информации о пациентах
 * @param callback
 */
module.exports.getPatients = function (params, callback) {
    sendReq('POST', 'getPatients', {name: params.name}, function (err, data) {
        if (err || !data.result) {
            console.error(err);
            return callback('Ошибка при получении записи из бд');
        }
        return callback(null, data.data);
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