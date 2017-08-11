//node app essentials
var express = require('express');
var app = express();
var url = 'mongodb://localhost:5000/data';
var routes = require('./routes/index');
var router = express.Router();
var bodyParser = require('body-parser');

//db code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://dannyrf3:dbpassword123@ds053419.mlab.com:53419/heroku_kw2vt8z6');

//passport
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

//mongoose
var http = require('http');
var mongoose = require('mongoose');

//options for the mongodb to connect to
var options = {
    server: { socketOptions: { keepAlive: 30000, connectTimeoutMS: 30000 } },
    replest: { socketOptions: { keepAlive: 30000, connectTimeoutMS: 30000 } }
};

//mongodb uri
var mongodbUri = 'mongodb://dannyrf3:dbpassword123@ds053419.mlab.com:53419/heroku_kw2vt8z6';

mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error'));
conn.once('open', function () {

    // set the view engine to ejs
    app.set('view engine', 'ejs');

    app.use(express.static(__dirname + '/public'));
    // use res.render to load up an ejs view file

    require('./config/passport')(passport);
    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(bodyParser());
    
    app.use(session( { secret: 'followfritz' }));
    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use(flash());

    require('./routes/routes.js');
    require('./routes/index.js');

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
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