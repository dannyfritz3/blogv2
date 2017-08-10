// server.js
// load the things we need
var express = require('express');
var app = express();
var url = 'mongodb://localhost:5000/data';
var routes = require('./routes/index');
//db code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/ff');

var http = require('http');
var mongoose = require('mongoose');

var options = {
    server: { socketOptions: { keepAlive: 30000, connectTimeoutMS: 30000 } },
    replest: { socketOptions: { keepAlive: 30000, connectTimeoutMS: 30000 } }
};

var mongodbUri = 'mongodb://dannyrf3:dbpassword123@ds053419.mlab.com:53419/heroku_kw2vt8z6';

mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error'));
conn.once('open', function () {
    
    // set the view engine to ejs
    app.set('view engine', 'ejs');

    app.use(express.static(__dirname + '/public'));
    // use res.render to load up an ejs view file

    app.use(function (req, res, next) {
        req.db = db;
        next();
    });

    app.use('/', routes);

    // index page 
    app.get('/', function (request, response) {
        response.render('pages/index');
    });

    // blog page 
    app.get('/blog', function (request, response) {
        response.render('pages/blog');
    });

    // map page
    app.get('/map', function (request, response) {
        response.render('pages/map');
    });

    //aboutme page
    app.get('/aboutme', function (request, response) {
        response.render('pages/aboutme');
    });

    // login page
    app.get('/login', function (request, response) {
        response.render('pages/login');
    });
    app.listen(process.env.PORT || 5000)
    console.log('5000 is the magic port');

});