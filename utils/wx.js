const config = require('config');
const appid = config.get('wx.appid');
const appsecret = config.get('wx.appsecret');
const OAuth = require('co-wechat-oauth');
const WechatAPI = require('co-wechat-api');
const redis = require('./redis');

const getToken = async () => await redis.get('wxToken');
const saveToken = async (token) => {
  await redis.set('wxToken', JSON.stringify(token));
};

const oauth = new OAuth(appid, appsecret, getToken, saveToken);
const api = new WechatAPI(appid, appsecret, getToken, saveToken);

module.exports = {
  oauth,
  api,
}
