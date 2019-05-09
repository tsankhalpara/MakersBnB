var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// configure app

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// define routes

app.get('/', function (req, res) {
  res.render('index', {
    title: 'Test',
    items: toDoItems
  });
});


app.listen(3000, function () {
  console.log('ready on port 3000');
});

module.exports = app;
