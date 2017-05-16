const fs = require('fs');
const url = require('url');
const redis = require('../utils/redis');
const logger = require('../utils/logger')('DPlayer');
const Danmaku = require('../models/danmaku');

exports.list = function (req, res) {
  Danmaku.distinct('player', function (err, data) {
    if (err) {
      logger.log(err);
    }

    let json = '';
    for (var i = 0; i < data.length; i++) {
      json += data[i] + `<br>`;
    }
    res.send(json);
  })
};

exports.detail = function (req, res) {
    res.header('content-type', 'application/json; charset=utf-8');

    var ip = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    var query = url.parse(req.url,true).query;
    var id = query.id;
    var max = query.max;

    redis.get(`dplayer${id}`, function(err, reply) {
      if (reply) {
        logger.info(`DPlayer id ${id} form redis, IP: ${ip}`);
        res.send(reply);
      }
      else {
        logger.info(`DPlayer id ${id} form mongodb, IP: ${ip}`);

        Danmaku.find({player: id}, function (err, data) {
          if (err) {
            logger.error(err);
          }

          var dan = {
            code: 1,
            danmaku: []
          };
          dan.danmaku = max ? data.slice(0, max) : data;
          var sendDan = JSON.stringify(dan);
          res.send(sendDan);

          redis.set(`dplayer${id}`, sendDan);
          redis.expire(`dplayer${id}`, 86400);
        })
      }
    });
};

function htmlEncode(str) {
  return str.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2f;");
}

var postIP = [];

exports.add = function (req, res) {
  var body = '';
  var jsonStr = {};
  var ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  // check black ip
  var blanklist = fs.readFileSync('blacklist').toString().split('\n');
  if (blanklist.indexOf(ip.split(',')[0]) !== -1) {
    logger.info(`Reject POST form ${ip} for black ip.`);
    res.send(`{"code": -1, "msg": "Rejected for black ip."}`);
    return;
  }

  // frequency limitation
  if (postIP.indexOf(ip) !== -1) {
    logger.info(`Reject POST form ${ip} for frequent operation.`);
    res.send(`{"code": -2, "msg": "Rejected for frequent operation."}`);
    return;
  }
  else {
    postIP.push(ip);
    setTimeout(function () {
      postIP.splice(0, 1);
    }, 1000);
  }

  req.on('data', dataListener);
  req.on('end', endListener);

  function dataListener (chunk) {
    body += chunk;
  }
  function endListener () {
    cleanListener();
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
      res.send(`{"code": -3, "msg": "Rejected for illegal data"}`);
      return;
    }

    // check token: set it yourself
    function checkToken (token) {
      return true;
    }
    if (!checkToken(jsonStr.token)) {
      logger.info(`Rejected POST form ${ip} for illegal token: ${jsonStr.token}`);
      res.send(`{"code": -4, "msg": "Rejected for illegal token: ${jsonStr.token}"}`);
      return;
    }

    // check black username
    if (blanklist.indexOf(jsonStr.author) !== -1) {
      logger.info(`Reject POST form ${jsonStr.author} for black user.`);
      res.send(`{"code": -5, "msg": "Rejected for black user."}`);
      return;
    }

    logger.info(`POST form ${ip}, data: ${JSON.stringify(jsonStr)}`);

    var dan = new Danmaku({
      player: htmlEncode(jsonStr.player),
      author: htmlEncode(jsonStr.author),
      time: jsonStr.time,
      text: htmlEncode(jsonStr.text),
      color: htmlEncode(jsonStr.color),
      type: htmlEncode(jsonStr.type),
      ip: ip,
      referer: req.headers.referer
    });
    dan.save(function (err, d) {
      if (err) {
        logger.error(err);
        res.send(`{"code": 0, "msg": "Error happens, please contact system administrator."}`);
      }
      else {
        res.send(`{"code": 1, "data": ${JSON.stringify(d)}}`);
        redis.del(`dplayer${htmlEncode(jsonStr.player)}`);
      }
    });
  }

  function cleanListener () {
    req.removeListener('data', dataListener);
    req.removeListener('end', endListener);
  }
};
