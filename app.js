const log4js = require('log4js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment');
const config = require('config');

mongoose.Promise = global.Promise;
mongoose.connect(config.get('mongodb'));

moment.locale('zh-cn');

app.use(log4js.connectLogger(log4js.getLogger("Http"), {
  level: 'auto',
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/request', require('./routes'));

module.exports = app;
