var async = require('async');

exports.up = function(db, callback) {
    async.waterfall([
        function (callback) {
            var sql = "CREATE TABLE IF NOT EXISTS doctors_schedules ( " +
                "id SERIAL PRIMARY KEY, doctor_id INT NOT NULL, schedule_id INT NOT NULL)";
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