const Koa = require('koa');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const moment = require('moment');

const logger = require('./utils/log');
const router = require('./routes');

const app = new Koa();

mongoose.Promise = global.Promise;
mongoose.connect(config.get('mongodb'));

moment.locale('zh-cn');

app.use(bodyParser());
app.use(async (ctx, next) => {
  const start = new Date();
  let ms;
  try {
    await next();
    ms = new Date() - start;
    logger.logResponse(ctx, ms);
  } catch (err) {
    ms = new Date() - start;
    logger.logError(ctx, err, ms);
  }
});
app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
