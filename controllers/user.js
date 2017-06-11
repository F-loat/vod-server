const request = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const config = require('config');
const { User } = require('../models');
const { wx } = require('../utils');
const createToken = require('../utils/token').create;
const expireToken = require('../utils/token').expire;
const { getDatePath } = require('../utils/upload');

const authServer = (stuid, pwd) => new Promise(async (resolve, reject) => {
  const url = 'http://authserver.tjcu.edu.cn/authserver/login';
  const loginPage = await request.get(url).timeout({
    response: 6000,
  });
  const $ = cheerio.load(loginPage.text);
  const lt = $('[name=lt]').val();
  const dllt = $('[name=dllt]').val();
  const execution = $('[name=execution]').val();
  const _eventId = $('[name=_eventId]').val();
  const rmShown = $('[name=rmShown]').val();
  try {
    const rst = await request.post(url)
      .type('form')
      .set('Cookie', loginPage.header['set-cookie'])
      .send({
        username: stuid,
        password: pwd,
        captchaRespon: '1',
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
    if (err.status !== 302) reject(new Error(`网络错误 ${err.status}`));
    resolve();
  }
});

exports.login = async (ctx) => {
  const { stuid, pwd } = ctx.request.body;
  await authServer(stuid, pwd);
  let user = await User.findOne({ stuid });
  if (!user) user = await User.create({ stuid, type: 2 });
  const token = createToken(user);
  user.lastLoginAt = Date.now();
  user.save();
  ctx.body = { state: 1, content: { user, token } };
};

exports.wxoauthurl = async (ctx) => {
  const baseurl = ctx.headers.referer;
  const authurl = wx.oauth.getAuthorizeURL(baseurl, 'wxoauth', 'snsapi_base');
  ctx.body = { state: 1, content: { authurl } };
};

exports.wxoauth = async (ctx) => {
  const code = ctx.request.body.code;
  const wxtoken = await wx.oauth.getAccessToken(code);
  const openid = wxtoken.data.openid;
  const user = await User.findOne({ openid });
  if (user) {
    const token = createToken(user);
    ctx.body = { state: 1, content: { user, token } };
  } else {
    const wxinfo = await wx.api.getUser({
      openid,
      lang: 'zh_CN',
    });
    ctx.body = { state: 1, content: { user: wxinfo } };
  }
};

exports.wxbind = async (ctx) => {
  const { stuid, pwd, openid } = ctx.request.body;
  await authServer(stuid, pwd);
  const wxinfo = await wx.api.getUser({
    openid,
    lang: 'zh_CN',
  });
  const user = await User.create({
    stuid,
    openid,
    nickname: wxinfo.nickname,
    sex: wxinfo.sex,
    city: wxinfo.city,
    province: wxinfo.province,
    avatar: path.relative(uploadPath, headimgPath),
    remark: wxinfo.remark,
    type: 3,
  });
  const headimgres = await request.get(wxinfo.headimgurl);
  const uploadPath = config.get('uploadPath');
  const headimgPath = path.join(getDatePath('headimg'), String(Date.now()));
  fs.writeFileSync(headimgPath, headimgres.body);
  const token = createToken(user);
  ctx.body = { state: 1, content: { user, token } };
};

exports.logout = (ctx) => {
  expireToken(ctx.user);
  ctx.body = { state: 1, content: true };
};

exports.detail = async (ctx) => {
  const { _id, exp } = ctx.user;
  const user = await User.findById(_id);
  if (!user) {
    ctx.body = { state: 0 };
    return;
  }
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
  console.info(`管理员${ctx.user.stuid}获取了用户列表`);
};

exports.update = async (ctx) => {
  const { _id, type } = ctx.request.body;
  const user = await User.findByIdAndUpdate(_id, { $set: { type } }, { new: true });
  ctx.body = { state: 1, content: user };
};

exports.delete = async (ctx) => {
  const _id = ctx.query._id;
  await User.update({ _id }, { $set: { deleted: true } });
  console.info(`用户${_id}被管理员${ctx.user.stuid}禁用`);
  ctx.body = { state: 1, content: true };
};
