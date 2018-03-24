"use strict";

const authentication = require('./authentication');
const registration = require('./registration');
const users = require('./users');
// var async = require('async');

module.exports.getRoles = function (req, res) {
    users.getRoles(function (err, data) {
        if (err) return res.send({result: false, note: err});
        return res.send({result: true, data: data});
    });
};

module.exports.getClients = function (req, res) {
    users.getClients(req.body, function (err, data) {
        if (err) return res.send({result: false, note: err});
        return res.send({result: true, data: data});
    });
};

module.exports.regClient = function (req, res) {
    console.log(req.body);
    registration.regClient(req.body, function (err) {
        if (err) return res.send({result: false, note: err});
        return res.send({result: true, data: 'Новый пользватель зарегистрирован'});
    });
};

module.exports.auth = function (req, res) {
    console.log(req.body);
    authentication.auth(req.body, function (err, data) {
        if (err) return res.send({result: false, note: err});
        if (data) {
            res.cookie('login', req.body.login);
            res.cookie('password', req.body.password);
        }
        return res.send({result: true, data: data});
    });
};

module.exports.getLoggedUser = function (req, res) {
    console.log(req.cookies);
    var data = {
        login: req.cookies.login,
        password: req.cookies.password
    };
    authentication.auth(data, function (err, data) {
        console.log(err);
        console.log(data);
        if (err) return res.send({result: false, note: err});
        return res.send({result: true, data: data});
    });
};

module.exports.logout = function (req, res) {
    res.clearCookie('login');
    res.clearCookie('password');
    console.log('Пользователь разлогинился');
    res.send({result: true});
};

