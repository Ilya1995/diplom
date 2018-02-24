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

// вывод всех таблиц
// select table_name
// from information_schema.tables
// where table_schema='public';


exports.up = function(db, callback) {
    var sql = "INSERT INTO clients (balance,name,email,login,password) " +
        "VALUES (1000, 'test2', '', 'test2', 'test2');";
    db.runSql(sql, function (err) {
        if (err) {
            console.log('errorrrrr1');
            return callback(err);
        }
        console.log('ok1');
        return callback(null);
    });
};

exports.down = function(db, callback) {
    console.log('errorrrrr2');
    return callback();
};