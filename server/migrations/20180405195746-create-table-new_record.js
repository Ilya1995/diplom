var async = require('async');

exports.up = function(db, callback) {
    async.series([
        function (callback) {
            var sql = "CREATE TABLE IF NOT EXISTS new_record (id SERIAL PRIMARY KEY, " +
                "user_patient_id INT NOT NULL, user_doctor_id INT NOT NULL, date_record TIMESTAMP);";
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