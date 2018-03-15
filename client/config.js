"use strict";
var config = {
    port: 3000,
    proxy: {
        host: '127.0.0.1',
        port: 3550
    }
};
config.env=process.env.NODE_ENV || 'dev';
exports.config = config;