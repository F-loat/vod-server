const Koa = require('koa');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const moment = require('moment');
const router = require('./app/router');

const app = new Koa();

mongoose.Promise = global.Promise;
mongoose.connect(config.get('mongodb'), {
  useMongoClient: true,
});

moment.locale('zh-cn');

app.use(bodyParser());
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    ctx.status = 500;
    ctx.body = err.message;
  }
});
app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
