
var http = require('http');	
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var logger = require('./utility/logger');
var app = express();


app.use(logger('dev'));
app.use(bodyParser.urlencoded());

app.get('/', function(req, res){
	res.send("Hola");
});

app.post('/msg', function(req, res) {
	console.dir(req.body);
    var from = req.body.From,
        to = req.body.To,
    	msg = req.body.Body;
    	res.send(msg + ' ' + ' to ' + to + ' from ' + from);
    // ...
});

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
    port = process.env.OPENSHIFT_NODEJS_PORT || '8080';

 //Start App
server = http.createServer(app).listen(port, ip, function(){
    console.log('Express server running at http://'+ip+':'+port+'/');
});

module.exports = app;