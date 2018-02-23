"use strict";

var phrases = require('./phrases');
// var async = require('async');

module.exports.phrases = function (req, res) {
    console.log(req.body);
    phrases.phrases(req.body, function (err, data) {
        console.log(err);
        console.log(data);
        if (err) {
            return res.send({result: false, note: err});
        }

        if (data.result) {
            res.send({result: true, data: data.data});
        } else {
            res.send({result: false, note: data.note});
        }
    });
};