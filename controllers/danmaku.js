const fs = require('fs');
const redis = require('../utils/redis');
const logger = require('log4js').getLogger('DPlayer');
const Danmaku = require('../models/danmaku');

exports.list = (ctx) => {
  Danmaku.distinct('player', (err, data) => {
    if (err) {
      logger.log(err);
    }

    let json = '';
    for (let i = 0; i < data.length; i += 1) {
      json += `${data[i]}<br>`;
    }
    ctx.body = json;
  });
};

exports.detail = async (ctx) => {
  const ip = ctx.headers['x-forwarded-for'] ||
    ctx.socket.remoteAddress;

  const { id, max } = ctx.query;

  const reply = await redis.get(`dplayer${id}`);
  if (reply) {
    logger.info(`DPlayer id ${id} form redis, IP: ${ip}`);
    ctx.body = reply;
  } else {
    logger.info(`DPlayer id ${id} form mongodb, IP: ${ip}`);
    try {
      const data = await Danmaku.find({ player: id });
      const dan = {
        code: 1,
        danmaku: [],
      };
      dan.danmaku = max ? data.slice(0, max) : data;
      const sendDan = JSON.stringify(dan);
      ctx.body = sendDan;

      redis.set(`dplayer${id}`, sendDan);
      redis.expire(`dplayer${id}`, 86400);
    } catch (err) {
      logger.error(err);
    }
  }
};

function htmlEncode(str) {
  return str.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2f;');
}

const postIP = [];

exports.add = (ctx) => {
  let body = '';
  let jsonStr = {};
  const ip = ctx.headers['x-forwarded-for'] ||
    ctx.socket.remoteAddress;

  // check black ip
  const blanklist = fs.readFileSync('blacklist').toString().split('\n');
  if (blanklist.indexOf(ip.split(',')[0]) !== -1) {
    logger.info(`Reject POST form ${ip} for black ip.`);
    ctx.body = '{"code": -1, "msg": "Rejected for black ip."}';
    return;
  }

  // frequency limitation
  if (postIP.indexOf(ip) !== -1) {
    logger.info(`Reject POST form ${ip} for frequent operation.`);
    ctx.body = '{"code": -2, "msg": "Rejected for frequent operation."}';
    return;
  }
  postIP.push(ip);
  setTimeout(() => postIP.splice(0, 1), 1000);

  function dataListener(chunk) {
    body += chunk;
  }
  function endListener() {
    ctx.request.removeListener('data', dataListener);
    ctx.request.removeListener('end', endListener);
    try {
      jsonStr = JSON.parse(body);
    } catch (err) {
      jsonStr = {};
    }

    // check data
    if (jsonStr.player === undefined
      || jsonStr.author === undefined
      || jsonStr.time === undefined
      || jsonStr.text === undefined
      || jsonStr.color === undefined
      || jsonStr.type === undefined
      || jsonStr.text.length >= 30) {
      logger.info(`Reject POST form ${ip} for illegal data: ${JSON.stringify(jsonStr)}`);
      ctx.body = '{"code": -3, "msg": "Rejected for illegal data"}';
      return;
    }

    // check token: set it yourself
    function checkToken(token) {
      console.log(token);
      return true;
    }
    if (!checkToken(jsonStr.token)) {
      logger.info(`Rejected POST form ${ip} for illegal token: ${jsonStr.token}`);
      ctx.body = `{"code": -4, "msg": "Rejected for illegal token: ${jsonStr.token}"}`;
      return;
    }

    // check black username
    if (blanklist.indexOf(jsonStr.author) !== -1) {
      logger.info(`Reject POST form ${jsonStr.author} for black user.`);
      ctx.body = '{"code": -5, "msg": "Rejected for black user."}';
      return;
    }

    logger.info(`POST form ${ip}, data: ${JSON.stringify(jsonStr)}`);

    const dan = new Danmaku({
      player: htmlEncode(jsonStr.player),
      author: htmlEncode(jsonStr.author),
      time: jsonStr.time,
      text: htmlEncode(jsonStr.text),
      color: htmlEncode(jsonStr.color),
      type: htmlEncode(jsonStr.type),
      ip,
      referer: ctx.headers.referer,
    });
    dan.save((err, d) => {
      if (err) {
        logger.error(err);
        ctx.body = '{"code": 0, "msg": "Error happens, please contact system administrator."}';
      } else {
        ctx.body = `{"code": 1, "data": ${JSON.stringify(d)}}`;
        redis.del(`dplayer${htmlEncode(jsonStr.player)}`);
      }
    });
  }

  ctx.request.on('data', dataListener);
  ctx.request.on('end', endListener);
};
