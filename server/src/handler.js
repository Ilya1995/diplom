"use strict";

const authentication = require('./authentication');
const registration = require('./registration');
const patients = require('./patients');
const doctors = require('./doctors');
const users = require('./users');
// var _ = require('underscore');
// var async = require('async');

// var newIdRoles = _.pluck(_.filter(params.roles, function (role) {return role.isUsed === true;}), 'id');
// _.each(oldIdRoles, function (oldRole) {
//     if(!_.find(newIdRoles, function(idRole){ return idRole === oldRole.role_id})) {
//         deleteIds.push(oldRole.id);
//     } else {
//         newIdRoles.splice(newIdRoles.indexOf(oldRole.role_id),1);
//     }
// });

module.exports.addWorker = function (req, res) {
    users.addWorker(req.body, function (err) {
        if (err) return res.send({result: false, note: err});
        return res.send({result: true});
    });
};

module.exports.getDoctorTypes = function (req, res) {
    doctors.getDoctorTypes(function (err, data) {
        if (err) return res.send({result: false, note: err});
        return res.send({result: true, data: data});
    });
};

module.exports.getDoctors = function (req, res) {
    doctors.getDoctors(req.body, function (err, data) {
        if (err) return res.send({result: false, note: err});
        return res.send({result: true, data: data});
    });
};

module.exports.getPatient = function (req, res) {
    patients.getPatient(req.params, function (err, data) {
        if (err) return res.send({result: false, note: err});
        return res.send({result: true, data: data});
    });
};

module.exports.getPatients = function (req, res) {
    patients.getPatients(req.body, function (err, data) {
        if (err) return res.send({result: false, note: err});
        return res.send({result: true, data: data});
    });
};

module.exports.regPatient = function (req, res) {
    console.log(req.body);
    registration.regPatient(req.body, function (err) {
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

