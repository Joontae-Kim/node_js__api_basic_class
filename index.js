const express = require('express');
// const sys = require('util');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const users = require('./api/users/users');

app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/users', users)

app.listen(3000, () => console.log('running'))

module.exports = app;
