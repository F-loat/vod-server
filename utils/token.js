const jwt = require('jwt-simple');
const moment = require('moment');
const redis = require('./redis');
const logger = require('log4js').getLogger('Token');

exports.create = function (user) {
  const expires = moment().day(7).valueOf();
  return jwt.encode({
    _id: user._id,
    type: user.type,
    stuid: user.stuid,
    exp: expires,
  }, 'youngon');
}

exports.verify = async function (req, res) {
  const token = req.headers.authorization;
  try {
    if (!token || token === 'undefined') {
      res.status(403).json({ "state": 0, msg: '访问受限' });
      return false;
    }
    const user = jwt.decode(token.substring(7), 'youngon');
    if (!user._id) {
      res.status(401).json({ "state": 0, msg: '令牌无效' });
      return false;
    }
    if (user.exp + 300000 < Date.now()) {
      res.status(401).json({ "state": 0, msg: '令牌已过期' });
      return false;
    }
    const reply = await redis.get(`token${user._id}`);
    if (reply && reply >= user.exp) {
      res.status(401).json({ "state": 0, msg: '令牌已被强制过期' });
      return false;
    }
    return user;
  } catch (err) {
    const msg = err.message;
    if (msg === 'Not enough or too many segments') {
      res.status(401).json({ "state": 0, msg: '令牌无效' });
    } else if (msg === 'Signature verification failed') {
      res.status(401).json({ "state": 0, msg: '令牌无效' });
    } else {
      res.status(500).json({ "state": 0, msg: '服务端错误' });
    }
    return false;
  }
}

exports.expire = async function (user) {
  const { _id, exp } = user;
  const redis_exp = Math.ceil((exp + 30000 - Date.now()) * 0.001);
  redis.set(`token${_id}`, exp);
  redis.expire(`token${_id}`, redis_exp);
}
