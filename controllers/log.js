const fs = require('fs');

exports.list = async (ctx) => {
  const log = fs.readFileSync('./logs/pm2-out-0.log', {
    encoding: 'utf8',
  });
  ctx.body = { state: 1, content: log };
};
