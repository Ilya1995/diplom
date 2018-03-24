// CREATE TABLE IF NOT EXISTS clients (
//     id SERIAL PRIMARY KEY,
//     balance INT NULL,
//     name VARCHAR(128) NOT NULL,
//     email VARCHAR(128) NOT NULL,
//     login VARCHAR(64) NOT NULL,
//     password VARCHAR(64) NOT NULL);
//
//
// INSERT INTO clients (balance,name,email,login,password)
// VALUES (1000, 'test1', '', 'test1', 'test1');


exports.up = function(db, callback) {
    var sql = "CREATE TABLE IF NOT EXISTS roles ( " +
        "id SERIAL PRIMARY KEY, name VARCHAR(128) NOT NULL)";
    db.runSql(sql, function (err) {
        if (err) {
            console.error('error1');
            return callback(err);
        }
        console.log('ok1');
        return callback(null);
    });
};

var async = require('async');

exports.up = function(db, callback) {
    async.series([
        function (callback) {
            var sql = "CREATE TABLE IF NOT EXISTS roles ( " +
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
            var sql = "INSERT INTO roles (name) VALUES ('Администратор');";
            db.runSql(sql, function (err) {
                if (err) {
                    return callback(err);
                }
                return callback(null);
            });
        },
        function (callback) {
            var sql = "INSERT INTO roles (name) VALUES ('Пользователь');";
            db.runSql(sql, function (err) {
                if (err) {
                    return callback(err);
                }
                return callback(null);
            });
        },
        function (callback) {
            var sql = "INSERT INTO roles (name) VALUES ('Разработчик');";
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