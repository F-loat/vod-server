const fs = require('fs');

exports.list = async (ctx) => {
  const logPath = './logs/pm2-out-0.log';
  if (!fs.existsSync(logPath)) {
    ctx.body = { state: 1, content: 'log file not exist' };
    return;
  }
  const log = fs.readFileSync(logPath, { encoding: 'utf8' });
  ctx.body = { state: 1, content: log };
};
