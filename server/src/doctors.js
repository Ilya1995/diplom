var config = require('../config/mainConfig').config;
var request = require('request');

/**
 * Получение расписания доктора
 * @param callback
 */
module.exports.getScheduleDoctor = function (params, callback) {
    sendReq('GET', 'getScheduleDoctor/'+params.id, null, function (err, data) {
        if (err || !data.result) {
            console.error(err);
            return callback('Ошибка получения записи из бд');
        }
        return callback(null, data.data);
    });
};

/**
 * Получение специализаций врачей
 * @param callback
 */
module.exports.getDoctorTypes = function (callback) {
    sendReq('GET', 'getDoctorTypes', null, function (err, data) {
        if (err || !data.result) {
            console.error(err);
            return callback('Ошибка получения записи из бд');
        }
        return callback(null, data.data);
    });
};

/**
 * Получение информации о конкретном докторе
 * @param callback
 */
module.exports.getDoctor = function (params, callback) {
    sendReq('GET', 'getDoctor/'+params.id, null, function (err, data) {
        if (err || !data.result) {
            console.error(err);
            return callback('Ошибка получения записи из бд');
        }
        return callback(null, data.data);
    });
};

/**
 * Получение общей информации о докторах
 * @param callback
 */
module.exports.getDoctors = function (params, callback) {
    sendReq('POST', 'getDoctors', {name: params.name}, function (err, data) {
        if (err || !data.result) {
            console.error(err);
            return callback('Ошибка получения записи из бд');
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