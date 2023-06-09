var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var helmet = require('helmet');
var winston = require('winston');
const routes = require('./shared/routes');
const CONFIG = require('./config/config');

global._ = require('lodash'); //For Default functionality
global.is_display_log = CONFIG.IS_DISPLAY_LOG || false;
global.logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    winston.format.printf(info => {
      return `${info.timestamp} [${info.level}] : ${info.message}`;
    })
  ),
  defaultMeta: { service: 'user-service'},
  transports: [
    new (winston.transports.File)({
      name: 'file.info',
      filename: path.join(__dirname, 'logs', 'info.log'), //path.join(__dirname  + './logs/info.log'),
      level: 'info'
    }),
    new (winston.transports.File)({
      name: 'file.error',
      filename: path.join(__dirname, 'logs', 'error.log'), //path.join(__dirname  + './logs/error.log'),
      level: 'error'
    })
  ]
})
// MongoDB global connection
const { mongoCon } = require('./shared/helpers');
global.mongoConn = mongoCon.getMongoConnection(CONFIG.mogno);

var app = express();

// view engine setup
app.use(helmet());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
routes.initialize(app);

app.use(function(req, res, next) {
  if(req.body){
    console.log(`Request Body:`, req.body);
  }
  let res_code = "";
  if(req.query['res_code']){
    res_code = req.query['res_code'];
  }
  res.res_code = res_code;

  var origin = '*'; //Default Origin
  if (req.headers.origin) {
    origin = req.headers.origin;
  }

  res.header("Access-Control-Allow-Origin", origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Token, Timestamp, X-Requested-With, Authorization");
  res.header('Access-Control-Allow-Credentials', true);

  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get('/api/v1/files/:filename',(req, res) => {
  res.sendFile(`${path.join(__dirname)}/public/files/${req.params.filename}.pdf`);
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  console.log('Error: ', err);
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
