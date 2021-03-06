var createError = require('http-errors');
var express = require('express');
var history = require('connect-history-api-fallback');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const User = require('./models/users')
const Board = require('./models/boards')
const Article = require('./models/articles')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());
app.use('/api', require('./routes/api'));
app.use(history());
app.use(express.static(path.join(__dirname, '../','fe', 'dist')));


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
  res.send({ msg: err.message });
  console.error(err.message)
});

module.exports = app;

const mongoose = require('mongoose')
// const User = require('./models/users')
const cfg = require('../config')

mongoose.connect(cfg.dbUrl, { useNewUrlParser: true, useUnifiedTopology : true, },  (err) => {
  if(err) return console.error(err)
  console.log('mongoose connected!')
  // User.deleteMany()
  //   .then(r => console.log(r))
  //   .catch(e => console.error(e))

  // User.create({ name: '하하' })
  //   .then(r => console.log(r))
  //   .catch(e => console.error(e))

})

// var jwt = require('jsonwebtoken');
// const key = '베리베리어려운키'
// var token = jwt.sign({ id: 'memi', email: 'memi@xxx' }, key);
// console.log(token)

// var decoded = jwt.verify(token, key);
// console.log(decoded) // bar

// User.deleteMany({})
//   .then(r => console.log(r))
//   .catch(err => console.error(err))

// User.findOne()
//   .then(r => console.log(73, r.id, r._id))  // 5e1580ab578ce7318c60716d

// Board.findOne()
//   .then(r => console.log(76, r.name, r._id))
