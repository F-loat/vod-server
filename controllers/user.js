const request = require('superagent');
const User = require('../models/user');
const createToken = require('../utils/token').create;
const expireToken = require('../utils/token').expire;
const logger = require('log4js').getLogger('User');

exports.login = async (ctx) => {
  const stuid = ctx.request.body.stuid;
  const pwd = ctx.request.body.pwd;
  const url = 'http://ids1.tjcu.edu.cn/amserver/UI/Login';
  const status = await request.post(url)
    .type('form')
    .send({
      IDToken1: stuid,
      IDToken2: pwd,
      IDButton: 'Submit',
      encoded: false,
      gx_charset: 'UTF-8',
    })
    .redirects(0)
    .then(response => response.status)
    .catch(err => err.status || err.code);
  if (status === 200) {
    ctx.body = { state: 0, msg: '学号或密码错误' };
    return;
  }
  if (status !== 302) {
    ctx.body = { state: 0, msg: `网络错误 ${status}` };
    return;
  }
  let user = await User.findOne({ stuid });
  if (!user) user = await User.create({ stuid });
  const token = createToken(user);
  user.lastLoginAt = Date.now();
  user.save();
  ctx.body = { state: 1, content: { user, token } };
};

exports.logout = (ctx) => {
  expireToken(ctx.user);
};

exports.detail = async (ctx) => {
  const { _id, exp } = ctx.user;
  const user = await User.findById(_id);
  let token;
  if (exp - Date.now() < 24 * 60 * 60 * 1000) {
    expireToken(ctx.user);
    token = createToken(user);
  }
  user.lastLoginAt = Date.now();
  user.save();
  ctx.body = { state: 1, content: { user, token } };
};

exports.list = async (ctx) => {
  const query = { deleted: false };
  const { type, limit = 0, page } = ctx.query;
  if (type) query.type = type;

  const result = await Promise.all([
    User
      .find(query)
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(Number(limit)),
    User.count(query),
  ]);
  const users = result[0];
  const totalCount = result[1];
  ctx.body = {
    state: 1,
    content: {
      users,
      totalCount,
    },
  };
  logger.info(`管理员${ctx.user.stuid}获取了用户列表`);
};

exports.update = async (ctx) => {
  const { _id, type } = ctx.request.body;
  try {
    const user = await User.findByIdAndUpdate(
      _id, { $set: { type } }, { new: true },
    );
    ctx.body = { state: 1, content: user };
  } catch (err) {
    logger.error(err);
    ctx.body = { state: 0, msg: err };
  }
};

exports.delete = async (ctx) => {
  const _id = ctx.query._id;
  try {
    await User.update({ _id }, { $set: { deleted: true } });
    logger.error(`用户${_id}被管理员${ctx.user.stuid}禁用`);
    ctx.body = { state: 1, content: true };
  } catch (err) {
    logger.error(err);
    ctx.body = { state: 0, msg: err };
  }
};
