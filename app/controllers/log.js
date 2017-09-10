const fs = require('fs');

exports.index = async (ctx) => {
  const logPath = './logs/pm2-out-0.log';
  if (!fs.existsSync(logPath)) {
    ctx.body = 'log file not exist';
    return;
  }
  const log = fs.readFileSync(logPath, { encoding: 'utf8' });
  ctx.body = log;
};
