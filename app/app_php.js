var express = require('express');
var app = express();
var phpExpress = require('php-express') ({
    binPath: 'php'
});

var portNum = 3000;

// set view engine to php-express
app.set('views', __dirname + '/app/views');
app.engine('.ejs', phpExpress.engine);
app.set('view engine', 'php');
 
// routing all .php file to php-express
app.all(/.+\.php$/, phpExpress.router);

app.use(express.static(__dirname + '/app'));

var server = app.listen(portNum, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening on port: ' + port)
});