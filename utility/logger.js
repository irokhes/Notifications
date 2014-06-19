/**
 * User access, app run and error log.
 *
 * @module Logger
 */

//import
var fs = require('fs');
var util = require('util');
var winston = require('winston');
var mkdirp = require('mkdirp');
var config = require('../config/appconfig.js');


var logPath = config.logging.logPath;
if(!fs.existsSync(logPath)){
    mkdirp.sync(logPath);
};

function createLogger(fileName){
    var logger = new (winston.Logger)({
        transports: [
          new (winston.transports.DailyRotateFile)({ 
            filename: util.format('%s/%s', logPath, fileName),
            datePattern: '-yyyy-MM-dd.log',
            maxsize: 1024 * 1024 * 10 // 10MB 
          })
        ]
    });
    return logger;
}

/**
 * Create an logger.
 *
 * @class Logger
 * @constructor
 */
function Logger(){
    this.appLog = createLogger('app');
    this.errorLog = createLogger('error');
    this.accessLog = createLogger('access');
    this.perfLog = createLogger('perf');
}

/**
 * Info Logger
 *
 * @method info
 * @param {message}
 *          log info message.
 */
Logger.prototype.info = function(message){
    this.appLog.info(message);
};

/**
 * Perf Logger
 *
 * @method info
 * @param {message}
 *          log info message.
 */
Logger.prototype.perf = function(message){
    this.perfLog.info(message);
};
/**
 * Error Logger
 *
 * @method error
 * @param {message}
 *          error message.
 */
Logger.prototype.error = function(message){
    var msg = '';
    if(typeof(message) == 'string')
        msg = message;
    else if(typeof(message) == 'object'){
        if(message instanceof Error)
            msg = message.toString();
        else
            msg = JSON.stringify(message);
    }
    this.errorLog.error(msg);
};

module.exports = new Logger();