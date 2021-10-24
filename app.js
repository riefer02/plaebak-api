var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const db = require('./db/index');

var AWS = require('aws-sdk');
// var S3 = require('aws-sdk/clients/s3');
// Set the Region
AWS.config.update({ region: 'us-east-2' });

console.log(AWS.config);
// Don't burn out friend.

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// console.log(indexRouter);

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

module.exports = app;
