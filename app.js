const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');


const app = express();

const routerClient = require('./routes/index');
const routerAdmin = require('./routes/admin');
const login = require('./routes/login');


require('./lib/db')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use( 
  session({
    cookie:{maxAge: 60000000000},
    store: new session.MemoryStore(),
    saveUninitialized: 'true',
    resave: 'true',
    secret: 'secret',

  })
);

app.use( flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routerClient);
app.use('/admin', routerAdmin);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
