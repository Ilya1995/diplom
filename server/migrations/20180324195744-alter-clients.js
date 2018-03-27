var async = require('async');

exports.up = function(db, callback) {
    async.waterfall([
        function (callback) {
            var sql = "ALTER TABLE clients DROP COLUMN balance;";
            db.runSql(sql, function (err) {
                if (err) {
                    return callback(err);
                }
                return callback(null);
            });
        },
        function (callback) {
            var sql = "ALTER TABLE clients DROP COLUMN login;";
            db.runSql(sql, function (err) {
                if (err) {
                    return callback(err);
                }
                return callback(null);
            });
        },
        function (callback) {
            var sql = "ALTER TABLE clients ADD COLUMN phone VARCHAR(128) NOT NULL;";
            db.runSql(sql, function (err) {
                if (err) {
                    return callback(err);
                }
                return callback(null);
            });
        },
        function (callback) {
            var sql = "ALTER TABLE clients ADD COLUMN serial INT NOT NULL;";
            db.runSql(sql, function (err) {
                if (err) {
                    return callback(err);
                }
                return callback(null);
            });
        },
        function (callback) {
            var sql = "ALTER TABLE clients ADD COLUMN number INT NOT NULL;";
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