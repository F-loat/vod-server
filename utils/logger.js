const fs = require('fs');
const path = require('path');
const log4js = require('log4js');
const moment = require('moment');

function getLogger(name) {
  const logger = log4js.getLogger(name);
  const logPath = path.join('logs', name);
  const date = moment().format("YYYY-MM-DD");
  const filename = path.join(logPath, `${date}.log`);

  if (!fs.existsSync(logPath)) fs.mkdirSync(logPath);

  logger.setLevel('INFO');
  log4js.configure({
    appenders: [
      {
        type: "file",
        filename,
        maxLogSize: 20480,
        backups: 3,
        category: name,
      },
    ],
    replaceConsole: true,
  });

  return logger;
}

module.exports = getLogger;
