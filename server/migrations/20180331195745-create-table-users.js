var async = require('async');

exports.up = function(db, callback) {
    async.series([
        function (callback) {
            var sql = "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, role_id INT NOT NULL, " +
                "patient_doctor_id INT NULL, phone VARCHAR(128) NOT NULL, password VARCHAR(64) NOT NULL, " +
                "name VARCHAR(128) NOT NULL, email VARCHAR(128) NOT NULL, date_reg TIMESTAMP);";
            db.runSql(sql, function (err) {
                if (err) {
                    console.error('error1');
                    return callback(err);
                }
                console.log('ok1');
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