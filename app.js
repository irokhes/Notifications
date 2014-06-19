
var http = require('http');

var express = require('express');

var app = express();


var bodyParser = require('body-parser')
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

 //Start App
server = http.createServer(app).listen(3500, function(){
    console.log('Express server listening on port ' + 3500);
});

module.exports = app;