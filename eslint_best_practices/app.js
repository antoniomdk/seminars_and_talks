var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var logger = require('morgan');
var flash = require('connect-flash');
var passport = require('passport');
require('./lib/auth');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');
var cartRouter = require('./routes/cart');
var orderRouter = require('./routes/order');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'tOp SecRet LoL',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
}));

app.use(bodyParser.urlencoded({ extended : true}));
app.use(cookieParser());

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.user = req.user;
  return next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
  // Set up flash messaging
  if(!req.session.messages) {
    req.session.messages = [];
  }
  res.locals.messages = req.session.messages;
  return next();
});

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/catalog', catalogRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
