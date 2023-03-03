var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const cors = require('cors');

var mongodb = require('./Config/mongodb.config');

//Include Routes in app
var indexRouter = require('./routes/index.routes');
var usersRouter = require('./routes/users.routes');
var expenseRouter = require('./routes/expenses.routes');
const expenseDataVis = require('./routes/expense-data-vis.routes');

var corsOptions = {
  origin: "http://localhost:8080"
};

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended : true }))
app.use(bodyParser.json());
app.use(cors(corsOptions));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/expenses', expenseRouter);
app.use('/expenseDataVis', expenseDataVis)

//Connection to mongodb
// mongodb.client.connect(err => {
//     console.log("connected to mongod")
//     const db = mongodb.client.db("expenses");
//     const collection = db.collection("expense-list");
//     // perform actions on the collection object
//   });

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

mongodb.connectToServer(function(err) {
  if (err) {
    console.error(err);
    process.exit();
  }
});

module.exports = app;
