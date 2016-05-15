var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var questions = require('./routes/questions');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/AwesomeAnswers');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// changed from jade to pug
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use are for our "middleware"
// Express uses a lot of "middleware" to handle a lot of basic actions.  These
// "middleware" can be chained.
// Think of middleware as "before actions" in Rails (note that Rails does a lot of
// these for us already)
app.use(logger('dev')); // Before => use logger
app.use(bodyParser.json()); // Before => parse the data as a JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/questions', questions);

// Example of how one of these "middleware" works
// Notice that this function is at the end => order matters!
// After it checks all the routes it will return a 404 not found.
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
