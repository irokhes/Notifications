
var http = require('http'); 
var express = require('express');
var logger_morgan = require('morgan');
var bodyParser = require('body-parser');
var logger = require('./utility/logger');
var app = express();


app.use(logger_morgan('dev'));
app.use(bodyParser.urlencoded());

app.get('/', function(req, res){
    res.send("Hola");
});

app.post('/msg', function(req, res) {
    
    var from = req.body.From,
        to = req.body.To,
        msg = req.body.Body;
        logger.info(msg + ' ' + ' to ' + to + ' from ' + from);
        res.send(200);
});

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
    port = process.env.OPENSHIFT_NODEJS_PORT || '8080';

 //Start App
server = http.createServer(app).listen(port, ip, function(){
    console.log('Express server running at http://'+ip+':'+port+'/');
});

module.exports = app;