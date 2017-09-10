const fs = require('fs');
const models = require('../models');
const utils = require('../utils');

exports.index = async (ctx) => {
  const data = await models.Danmaku.distinct('player');
  let json = '';
  for (let i = 0; i < data.length; i += 1) {
    json += `${data[i]}<br>`;
  }
  ctx.body = json;
};

exports.show = async (ctx) => {
  ctx.body = {};
  const ip = ctx.headers['x-forwarded-for'] ||
    ctx.socket.remoteAddress;

  const { id, max } = ctx.query;

  const reply = await utils.redis.get(`dplayer${id}`);
  if (reply) {
    console.info(`DPlayer id ${id} form redis, IP: ${ip}`);
    ctx.body = reply;
  } else {
    console.info(`DPlayer id ${id} form mongodb, IP: ${ip}`);
    try {
      const data = await models.Danmaku.find({ player: id });
      const dan = {
        code: 1,
        danmaku: [],
      };
      dan.danmaku = max ? data.slice(0, max) : data;
      const sendDan = JSON.stringify(dan);
      ctx.body = sendDan;

      utils.redis.set(`dplayer${id}`, sendDan);
      utils.redis.expire(`dplayer${id}`, 86400);
    } catch (err) {
      console.error(err);
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

exports.create = async (ctx) => {
  ctx.body = {};

  const body = ctx.request.body;
  let jsonStr = {};
  const ip = ctx.headers['x-forwarded-for'] ||
    ctx.socket.remoteAddress;

  // check black ip
  const blanklist = fs.readFileSync('blacklist').toString().split('\n');
  if (blanklist.indexOf(ip.split(',')[0]) !== -1) {
    console.info(`Reject POST form ${ip} for black ip.`);
    ctx.body = '{"code": -1, "msg": "Rejected for black ip."}';
    return;
  }

  // frequency limitation
  if (postIP.indexOf(ip) !== -1) {
    console.info(`Reject POST form ${ip} for frequent operation.`);
    ctx.body = '{"code": -2, "msg": "Rejected for frequent operation."}';
    return;
  }
  postIP.push(ip);
  setTimeout(() => postIP.splice(0, 1), 1000);

  try {
    jsonStr = typeof body === 'string' ? JSON.parse(body) : body;
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
    console.info(`Reject POST form ${ip} for illegal data: ${JSON.stringify(jsonStr)}`);
    ctx.body = '{"code": -3, "msg": "Rejected for illegal data"}';
    return;
  }

  // check black username
  if (blanklist.indexOf(jsonStr.author) !== -1) {
    console.info(`Reject POST form ${jsonStr.author} for black user.`);
    ctx.body = '{"code": -5, "msg": "Rejected for black user."}';
    return;
  }

  console.info(`POST form ${ip}, data: ${JSON.stringify(jsonStr)}`);

  try {
    const dan = await models.Danmaku.create({
      player: htmlEncode(jsonStr.player),
      author: htmlEncode(jsonStr.author),
      time: jsonStr.time,
      text: htmlEncode(jsonStr.text),
      color: htmlEncode(jsonStr.color),
      type: htmlEncode(jsonStr.type),
      ip,
      referer: ctx.headers.referer,
    });
    ctx.body = `{"code": 1, "data": ${JSON.stringify(dan)}}`;
    utils.redis.del(`dplayer${htmlEncode(jsonStr.player)}`);
  } catch (err) {
    console.error(err);
    ctx.body = '{"code": 0, "msg": "Error happens, please contact system administrator."}';
  }
};
