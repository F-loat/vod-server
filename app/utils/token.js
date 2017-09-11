const fs = require('fs');
const jwt = require('jwt-simple');
const config = require('config');
const moment = require('moment');
const redis = require('./redis');

const secretKey = config.get('secret_key');

exports.create = (user) => {
  const { _id, type, username, openid } = user;
  const expires = moment().add(7, 'days').valueOf();
  return jwt.encode({
    _id,
    type,
    username,
    openid,
    exp: expires,
  }, secretKey);
};

exports.verify = async (ctx) => {
  const token = ctx.headers.authorization;
  try {
    if (!token || token === 'undefined') {
      ctx.status = 403;
      ctx.body = '访问受限';
      return false;
    }
    const user = jwt.decode(token.substring(7), secretKey);
    if (!user._id) {
      ctx.status = 401;
      ctx.body = '令牌无效';
      return false;
    }
    if (user.exp + 300000 < Date.now()) {
      ctx.status = 401;
      ctx.body = '令牌已过期';
      return false;
    }
    const reply = await redis.get(`token${user._id}`);
    if (reply && reply >= user.exp) {
      ctx.status = 401;
      ctx.body = '令牌已被强制过期';
      return false;
    }
    return user;
  } catch (err) {
    const msg = err.message;
    if (msg === 'Not enough or too many segments') {
      ctx.status = 401;
      ctx.body = '令牌格式错误';
    } else if (msg === 'Signature verification failed') {
      ctx.status = 401;
      ctx.body = '令牌验证失败';
    } else {
      ctx.status = 500;
      ctx.body = '服务端错误';
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
