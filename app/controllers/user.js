const fs = require('fs');
const path = require('path');
const config = require('config');
const cheerio = require('cheerio');
const CryptoJS = require('crypto-js');
const uuid = require('uuid/v4');
const models = require('../models');
const utils = require('../utils');

const secretKey = config.get('secret_key');

const getWXInfo = code => new Promise(async (resolve, reject) => {
  try {
    const wxtoken = await utils.wechat.oauth.getAccessToken(code);
    const openid = wxtoken.data.openid;
    const wxinfo = await utils.wechat.api.getUser({
      openid,
      lang: 'zh_CN',
    });
    const headimgres = await utils.request.get(wxinfo.headimgurl);
    const datePath = utils.upload.getDatePath('headimg');
    const uploadPath = config.get('uploadPath');
    const headimgPath = path.join(datePath, uuid());
    fs.writeFileSync(headimgPath, headimgres.body);
    wxinfo.avatar = path.relative(uploadPath, headimgPath).replace(/\\/g, '/');
    resolve(wxinfo);
  } catch (err) {
    reject(err);
  }
});


const authServer = data => new Promise(async (resolve, reject) => {
  const { username, password, captcha } = data;
  const url = 'http://authserver.tjcu.edu.cn/authserver/login';
  try {
    const loginPage = await utils.request.get(url).timeout({
      response: 6000,
    });
    const $ = cheerio.load(loginPage.text);
    const lt = $('[name=lt]').val();
    const dllt = $('[name=dllt]').val();
    const execution = $('[name=execution]').val();
    const _eventId = $('[name=_eventId]').val();
    const rmShown = $('[name=rmShown]').val();
    const rst = await utils.request.post(url)
      .type('form')
      .set('Cookie', loginPage.header['set-cookie'])
      .send({
        username,
        password,
        captchaRespon: captcha || 0,
        lt,
        dllt,
        execution,
        _eventId,
        rmShown,
      })
      .redirects(0);
    const msg = cheerio.load(rst.text)('#msg').text();
    reject(new Error(msg));
  } catch (err) {
    if (err.errno === 'ETIMEDOUT') reject(new Error('统一登录平台请求超时'));
    if (err.status !== 302) reject(new Error(`网络错误 ${err.status}`));
    resolve();
  }
});

exports.index = async (ctx) => {
  const {
    type,
    sort = '-createdAt',
    page = 1,
    limit = 10 } = ctx.query;
  const query = {};
  if (type) query.type = type;

  const [users, total] = await Promise.all([
    models.User
      .find(query)
      .select('-password')
      .sort(sort)
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(Number(limit)),
    models.User.count(query),
  ]);

  console.info(`管理员${ctx.user.username}获取了用户列表`);
  ctx.body = { users, total };
};

exports.show = async (ctx) => {
  if (ctx.params.id !== 'self') {
    ctx.status = 403;
    return;
  }
  const { _id, exp } = ctx.user;
  const user = await models.User.findById(_id);
  if (!user) {
    ctx.status = 404;
    return;
  }
  if (exp < Date.now() + utils.ms('1d')) {
    utils.token.expire(ctx.user);
    const token = utils.token.create(user);
    ctx.set('set-authorization', token);
  }

  ctx.body = user;
};

exports.create = async (ctx) => {
  const data = ctx.request.body;

  if (data.insider !== false) {
    try {
      await authServer(data);
    } catch (err) {
      ctx.status = 400;
      ctx.body = err.message;
      return;
    }
  }
  const user = await models.User.create({
    username: data.username,
    nickname: data.username,
    password: CryptoJS.HmacSHA1(data.password, secretKey),
    insider: data.insider,
  });

  const token = utils.token.create(user);
  ctx.set('set-authorization', token);
  ctx.status = 201;
  ctx.body = user;
};

exports.update = async (ctx) => {
  if (ctx.query.type === 'code') {
    const wxInfo = await getWXInfo(ctx.request.body.code);
    await models.User.update({
      _id: ctx.user._id,
    }, wxInfo);
    ctx.status = 200;
    return;
  }
  const { body } = ctx.request;
  await models.User.update({
    _id: ctx.params.id === 'self' ? ctx.user._id : ctx.params.id,
  }, {
    type: body.type,
  });
  ctx.status = 200;
};

exports.destroy = async (ctx) => {
  const _id = ctx.params.id;
  await models.User.remove({ _id });
  ctx.status = 200;
  console.info(`用户 ${_id} 被管理员 ${ctx.user.username} 删除`);
};
