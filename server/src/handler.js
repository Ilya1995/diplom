"use strict";

var authentication = require('./authentication');
// var async = require('async');

module.exports.auth = function (req, res) {
    console.log(req.body);
    authentication.auth(req.body, function (err, data) {
        if (err) return res.send({result: false, note: err});
        return res.send({result: true, data: data});
    });
};