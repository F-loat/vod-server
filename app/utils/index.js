const request = require('superagent');
const ms = require('ms');
const redis = require('./redis');
const t2d = require('./test2doc');
const token = require('./token');
const upload = require('./upload');
const transcode = require('./transcode');
const wechat = require('./wechat');

module.exports = {
  request,
  ms,
  redis,
  t2d,
  token,
  upload,
  transcode,
  wechat,
};
