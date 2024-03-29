var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var users = require('./routes/users');
var connect = require('./routes/connect');
var disconnectt = require('./routes/disconnect');
var activities = require('./routes/activities');
var upload = require('./routes/upload');

var app = express();
app.use(session({
  secret: 'chut',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// add sessions to jade
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use('/', indexRouter);
app.use('/users', users);
app.use('/connect', connect);
app.use('/disconnect', disconnectt);
app.use('/upload', upload);
app.use('/activities', activities);

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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
