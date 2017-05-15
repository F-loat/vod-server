const request = require('superagent');
const jwt = require('jwt-simple');
const User = require('../models/user');
const createToken = require('../utils/token').create;
const expireToken = require('../utils/token').expire;

exports.login = async function (req, res, next) {
  const stuid = req.body.stuid;
  const pwd = req.body.pwd;
  const url = 'http://ids1.tjcu.edu.cn/amserver/UI/Login';
  const status = await request.post(url)
    .type('form')
    .send({
      IDToken1: req.body.stuid,
      IDToken2: req.body.pwd,
      IDButton: 'Submit',
      encoded: false,
      gx_charset: 'UTF-8',
    })
    .redirects(0)
    .then(response => response.status)
    .catch(err => err.status || err.code);
  if (status === 200) {
    res.json({ state: 0, msg: '学号或密码错误' });
    return;
  }
  if (status !== 302) {
    res.json({ state: 0, msg: `网络错误 ${status}` });
    return;
  }
  let user = await User.findOne({ stuid });
  if (!user) user = await User.create({ stuid });
  token = createToken(user);
  user.lastLoginAt = Date.now();
  user.save();
  res.json({ state: 1, content: { user, token } });
};

exports.logout = function (req, res) {
  expireToken(req.user);
}

exports.detail = async function (req, res) {
  const { _id, exp } = req.user;
  const user = await User.findById(_id);
  let token;
  if (exp - Date.now() < 24 * 60 * 60 * 1000) {
    expireToken(req.user);
    token = createToken(user);
  }
  user.lastLoginAt = Date.now();
  user.save();
  res.json({ state: 1, content: { user, token } });
};

exports.list = async function (req, res) {
  const query = { deleted: false };
  const { type, limit = 0, page } = req.query;
  if (type) query.type = type;

  const result = await Promise.all([
    User
      .find(query)
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(Number(limit)),
    User.count(query),
  ]);
  const users = await result[0];
  const totalCount = await result[1];
  res.json({ state: 1, content: {
    users,
    totalCount,
  }})
};

exports.update = async function (req, res) {
  const { _id, type } = req.body;
  try {
    const user = await User
      .findByIdAndUpdate(_id, {
        $set: { type },
      }, { new: true });
    res.json({ state: 1, content: user });
  } catch (err) {
    console.log(err);
    res.json({ state: 0, msg: err });
  }
};

exports.delete = async function (req, res) {
  const _id = req.query._id;
  try {
    await User.update({ _id }, { $set: { deleted: true } });
    res.json({ state: 1, content: true });
  } catch (err) {
    console.log(err);
    res.json({ state: 0, msg: err });
  }
};
