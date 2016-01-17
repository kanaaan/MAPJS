/*
 * leaflet on the server side
 * var map = L.map(document.createElement('div')).setView([52, 4], 10);
 * https://github.com/jieter/leaflet-headless
 * */
console.log('Load leaflet on server side');
var L = require('./js/leaflet-server.js');
/*
 * express
 * */
var express = require('express');
var app = express(); app.set('view engine', 'jade');
var http = require('http');
var path = require('path');
// Environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/map', function (req, res) {
    res.render('map', { title: 'Map- Leaflet test on client side' });
});

app.get('/', function (req, res) {
    res.render('main', { title: 'Test WinJS inside Nodejs' });
});

/* 
 * Send leaflet javascrîpt and css from the server side to the client side, 
 * instead of downloading them it from internet
 * */
app.get('/leaflet.js', function (req, res) {
    res.sendFile(path.join(__dirname + '/node_modules/leaflet/dist/leaflet.js'));
});
app.get('/leaflet.css', function (req, res) {
    res.sendFile(path.join(__dirname + '/node_modules/leaflet/dist/leaflet.css'));
});
/* 
 * Send WinJs javascrîpt and css from the server side to the client side, 
 * instead of downloading them it from internet
 * */
app.get('/base.js', function (req, res) {
    res.sendFile(path.join(__dirname + '/node_modules/winjs/js/base.js'));
});
app.get('/ui.js', function (req, res) {
    res.sendFile(path.join(__dirname + '/node_modules/winjs/js/ui.js'));
});
app.get('/ui-dark.css', function (req, res) {
    res.sendFile(path.join(__dirname + '/node_modules/winjs/css/ui-dark.css'));
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

