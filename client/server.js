var express = require('express');
var config = require('./config').config;
var app = express();
var path = require('path');
var httpProxy = require('http-proxy');

var proxy = new httpProxy.createProxyServer({
    target: {
        host: config.proxy.host,
        port: config.proxy.port
    }
});

app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(config.port, function () {
    console.log('Example app listening on port 3000!')
});

app.all('/api/*', function(req, res) {
    proxy.web(req, res);
    proxy.on('error', function(err) {
        console.error('Error httpProxy:');
        console.error(err);
    });
});