const fs = require('fs');
const jwt = require('jwt-simple');
const config = require('config');
const moment = require('moment');
const redis = require('./redis');

const publicKey = fs.readFileSync(config.get('secret.public'));
const privateKey = fs.readFileSync(config.get('secret.private'));
exports.create = (user) => {
  const { _id, type, stuid, openid } = user;
  const expires = moment().add(7, 'days').valueOf();
  return jwt.encode({
    _id,
    type,
    stuid,
    openid,
    exp: expires,
  }, privateKey);
};

exports.verify = async (ctx) => {
  const token = ctx.headers.authorization;
  try {
    if (!token || token === 'undefined') {
      ctx.status = 403;
      ctx.body = { state: 0, msg: '访问受限' };
      return false;
    }
    const user = jwt.decode(token.substring(7), publicKey, 'RS256');
    if (!user._id) {
      ctx.status = 401;
      ctx.body = { state: 0, msg: '令牌无效' };
      return false;
    }
    if (user.exp + 300000 < Date.now()) {
      ctx.status = 401;
      ctx.body = { state: 0, msg: '令牌已过期' };
      return false;
    }
    const reply = await redis.get(`token${user._id}`);
    if (reply && reply >= user.exp) {
      ctx.status = 401;
      ctx.body = { state: 0, msg: '令牌已被强制过期' };
      return false;
    }
    return user;
  } catch (err) {
    const msg = err.message;
    if (msg === 'Not enough or too many segments') {
      ctx.status = 401;
      ctx.body = { state: 0, msg: '令牌无效' };
    } else if (msg === 'Signature verification failed') {
      ctx.status = 401;
      ctx.body = { state: 0, msg: '令牌无效' };
    } else {
      ctx.status = 500;
      ctx.body = { state: 0, msg: '服务端错误' };
    }
    return false;
  }
};

exports.expire = async (user) => {
  const { _id, exp } = user;
  const redisExp = Math.ceil(((exp + 30000) - Date.now()) * 0.001);
  redis.set(`token${_id}`, exp);
  redis.expire(`token${_id}`, redisExp);
};
