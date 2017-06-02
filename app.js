const Koa = require('koa');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const moment = require('moment');
const router = require('./routes');

const app = new Koa();

mongoose.Promise = global.Promise;
mongoose.connect(config.get('mongodb'));

moment.locale('zh-cn');

app.use(bodyParser());
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    ctx.body = { state: 0, msg: err.message };
  }
});
app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
