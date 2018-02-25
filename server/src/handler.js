"use strict";

var authentication = require('./authentication');
// var async = require('async');

module.exports.auth = function (req, res) {
    console.log(req.body);
    authentication.auth(req.body, function (err, data) {
        if (err) return res.send({result: false, note: err});
        if (data) {
            res.cookie('login', req.body.login);
            res.cookie('password', req.body.password);
        }
        res.cookie('1', '1');
        return res.send({result: true, data: data});
    });
};

module.exports.getLoggedUser = function (req, res) {
    console.log(req.cookies);
    return res.send({result: false, note: 'errrr'});
    // authentication.getLoggedUser(req.cookies, function (err, data) {
    //     console.log(err);
    //     console.log(data);
    //     if (err) {
    //         return res.send({result: false, note: err});
    //     }
    //     if (data.result) {
    //         res.send({result: true, data: data.data});
    //     } else {
    //         res.send({result: false, note: data.note});
    //     }
    //
    //     //res.send({result: true, data: data});
    // });
};

module.exports.logout = function (req, res) {
    res.clearCookie('login');
    res.clearCookie('password');
    console.log('Пользователь разлогинился');
    res.send({result: true});
};
