"use strict";

const patients = require('./patients');
const doctors = require('./doctors');

module.exports.getPatients = function (req, res) {
    patients.getPatients(req.body, function (err, data) {
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

module.exports.deletePatient = function (req, res) {
    patients.deletePatient(req.params, function (err) {
        if (err) return res.send({result: false, note: err});
        return res.send({result: true});
    });
};

module.exports.getDoctors = function (req, res) {
    doctors.getDoctors(req.body, function (err, data) {
        if (err) return res.send({result: false, note: err});
        return res.send({result: true, data: data});
    });
};


module.exports.getDoctor = function (req, res) {
    doctors.getDoctor(req.params, function (err, data) {
        if (err) return res.send({result: false, note: err});
        return res.send({result: true, data: data});
    });
};

module.exports.getDoctorTypes = function (req, res) {
    doctors.getDoctorTypes(function (err, data) {
        if (err) return res.send({result: false, note: err});
        return res.send({result: true, data: data});
    });
};

module.exports.getScheduleDoctor = function (req, res) {
    doctors.getScheduleDoctor(req.params, function (err, data) {
        if (err) return res.send({result: false, note: err});
        return res.send({result: true, data: data});
    });
};

module.exports.insertPatient = function (req, res) {
    patients.insertPatient(req.body, function (err, data) {
        if (err) return res.send({result: false, note: err});
        return res.send({result: true, data: data});
    });
};

module.exports.newSchedule = function (req, res) {
    doctors.newSchedule(req.body, function (err) {
        if (err) return res.send({result: false, note: err});
        return res.send({result: true});
    });
};

module.exports.insertDoctor = function (req, res) {
    doctors.insertDoctor(req.body, function (err, data) {
        if (err) return res.send({result: false, note: err});
        return res.send({result: true, data: data});
    });
};


