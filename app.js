var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// database connection
const app = express();
var pg = require('pg');
var format = require('pg-format');
var PGUSER = 'Tara';
var PGDATABASE = 'makersbnb';

var config = {
  user: PGUSER, // name of the user account
  database: PGDATABASE, // name of the database
  max: 100, // max number of clients in the pool
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
}

var pool = new pg.Pool(config)
var myClient
// database test

var username = "calum.d";

pool.connect(function (err, client, done) {
  if (err) console.log(err)
  app.listen(3000, function () {
    console.log('Connected successfully')
  })
  myClient = client
  var nameQuery = format('SELECT * from users WHERE username = %L', username);
  myClient.query(nameQuery, function (err, result) {
    if (err) {
      console.log(err)
    }
    console.log(result.rows[0])
  })
})

// configure app

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// define routes

app.get('/', function (req, res) {
  res.render('index', {
    title: 'Test',
    items: toDoItems
  });
});

module.exports = app;
