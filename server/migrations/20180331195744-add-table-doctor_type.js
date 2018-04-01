var async = require('async');

exports.up = function(db, callback) {
    async.series([
        function (callback) {
            var sql = "CREATE TABLE IF NOT EXISTS doctor_type ( " +
                "id SERIAL PRIMARY KEY, name VARCHAR(128) NOT NULL)";
            db.runSql(sql, function (err) {
                if (err) {
                    console.error('error1');
                    return callback(err);
                }
                console.log('ok1');
                return callback(null);
            });
        },
        function (callback) {
            var sql = "INSERT INTO doctor_type (name) VALUES ('Врач-проктолог'),('Врач-уролог'),('Врач-гинеколог')," +
                "('Врач ультразвуковой диагностики (УЗИ)'),('Врач-гастроэнтеролог'),('Врач-невролог'),('Врач-дерматовенеролог');";
            db.runSql(sql, function (err) {
                if (err) {
                    return callback(err);
                }
                return callback(null);
            });
        }
    ], function (err) {
        if (err) {
            console.error('error1');
            return console.error(err);
        }
        return callback();
    });
};

exports.down = function(db, callback) {
    console.error('error2');
    return callback();
};