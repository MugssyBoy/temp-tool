var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var login = require('./routes/login');
var tyrRouter = require('./routes/tyrparser');
var stanceRouter = require('./routes/stanceparser');
var sauconyRouter = require('./routes/sauconyparser');
var inovRouter = require('./routes/inovparser');
var batesRouter = require('./routes/batesParser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', login);
app.use('/tyrparser', tyrRouter);
app.use('/stanceparser', stanceRouter);
app.use('/sauconyparser', sauconyRouter);
app.use('/inovparser', inovRouter);
app.use('/batesparser', batesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //next(createError(404));
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
