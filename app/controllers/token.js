const path = require('path');
const config = require('config');
const CryptoJS = require('crypto-js');
const models = require('../models');
const utils = require('../utils');

const secretKey = config.get('secret_key');

const getWXInfo = openid => new Promise(async (resolve, reject) => {
  try {
    const wxinfo = await utils.wechat.api.getUser({
      openid,
      lang: 'zh_CN',
    });
    const headimgres = await utils.request.get(wxinfo.headimgurl);
    const datePath = utils.upload.getDatePath('headimg');
    const uploadPath = config.get('uploadPath');
    const headimgPath = path.join(datePath, String(Date.now()));
    utils.fs.writeFileSync(headimgPath, headimgres.body);
    wxinfo.avatar = path.relative(uploadPath, headimgPath);
    resolve(wxinfo);
  } catch (err) {
    reject(err);
  }
});

exports.create = async (ctx) => {
  const { type = 'password' } = ctx.query;

  let user;
  if (type === 'password') {
    const { username, password } = ctx.request.body;
    user = await models.User.findOne({ username });
    const encryptedPassword = CryptoJS.HmacSHA1(password, secretKey);
    if (user && user.password !== String(encryptedPassword)) {
      ctx.status = 400;
      ctx.body = '用户名或密码错误';
      return;
    }
  } else if (type === 'code') {
    const { code } = ctx.request.body;
    const wxtoken = await utils.wechat.oauth.getAccessToken(code);
    const openid = wxtoken.data.openid;
    user = await models.User.findOne({ openid });
  }
  if (!user) {
    ctx.status = 404;
    ctx.body = '该账号不存在';
    return;
  }
  const token = utils.token.create(user);
  user.lastLoginAt = Date.now();
  user.save();

  ctx.set('set-authorization', token);
  ctx.status = 201;
  ctx.body = token;
};

exports.destroy = (ctx) => {
  utils.token.expire(ctx.user);
  ctx.status = 200;
};
