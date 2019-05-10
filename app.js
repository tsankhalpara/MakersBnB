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
var PGUSER = 'student';
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

app.get('/signup', function (req, res) {
  res.render('signup');
});

app.post('/signup', function (req, res) {

  var username = req.param('username');
  var email = req.param('email');
  var password = req.param('password');

  const text = 'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *';
  const values = [username, email, password];

  pool.query(text, values, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0])
    }
  });
  res.redirect('/confirmation') // does the session variable need to be passed as an argument here?
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.get('/confirmation', function (req, res) {
  res.render('confirmation');
});

app.get('/spaces', function (req, res) {
  const showSpaces = pool.query("SELECT * FROM spaces", (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0])
    }
  });
  res.render('spaces');
});

app.post('/spaces', function (req, res) {

  var name = req.param('name');
  var description = req.param('description');
  var price = req.param('price');

  const text = 'INSERT INTO spaces(name, description, price) VALUES($1, $2, $3) RETURNING *';
  const values = [name, description, price];

  pool.query(text, values, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0])
    }
  });
  res.redirect('/spaces') // does the session variable need to be passed as an argument here?
});


module.exports = app;
