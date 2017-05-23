const fs = require('fs');
const moment = require('moment');

exports.list = async (ctx) => {
  const today = moment().format('YYYY-MM-DD');
  const log = fs.readFileSync(`./logs/app/log.${today}`, {
    encoding: 'utf8',
  });
  ctx.body = { state: 1, content: log };
};
