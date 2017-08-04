// server.js
// load the things we need
var express = require('express');
var app = express();
var mongodb = require('mongodb');
var pg = require('pg');

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
// use res.render to load up an ejs view file

// index page 
app.get('/', function(request, response) {
    response.render('pages/index');
});

// blog page 
app.get('/blog', function(request, response) {
    response.render('pages/blog');
});

// map page
app.get('/map', function(request, response) {
    response.render('pages/map');
});

//aboutme page
app.get('/aboutme', function(request, response) {
    response.render('pages/aboutme');
});

// login page
app.get('/login', function(request, response) {
    response.render('pages/login');
});
app.listen(process.env.PORT || 5000)
console.log('5000 is the magic port');