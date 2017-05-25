const fs = require('fs');
const log4js = require('log4js');

/**
 * Configure logger.
 */
const basePath = './logs';
const accessPath = './logs/access';
const appPath = './logs/app';
if (!fs.existsSync(basePath)) fs.mkdirSync(basePath);
if (!fs.existsSync(accessPath)) fs.mkdirSync(accessPath);
if (!fs.existsSync(appPath)) fs.mkdirSync(appPath);

log4js.configure('./config/log4js.json');

// 格式化请求日志
const formatReq = (req, resTime) => {
  let logText = '';

  // 访问方法
  logText += `request method: ${req.method}\n`;

  // 请求原始地址
  logText += `request originalUrl:  ${req.originalUrl}\n`;

  // 客户端ip
  logText += `request client ip:  ${req.ip}\n`;

  // 服务器响应时间
  logText += `response time: ${resTime}\n`;

  return logText;
};

// 格式化响应日志
const formatRes = (ctx, resTime) => {
  let logText = '';

  // 响应日志开始
  logText += '\n*************** response log start ***************\n';

  // 添加请求日志
  logText += formatReq(ctx.request, resTime);

  // 响应状态码
  logText += `response status: ${ctx.status}\n`;

  // 响应内容
  if (ctx.status !== 200) logText += `response body: ${JSON.stringify(ctx.body)}\n`;

  // 响应日志结束
  logText += '*************** response log end ***************\n';

  return logText;
};

// 格式化错误日志
const formatError = (ctx, err, resTime) => {
  let logText = '';

  // 错误信息开始
  logText += '\n*************** error log start ***************\n';

  // 添加请求日志
  logText += formatReq(ctx.request, resTime);

  // 错误名称
  logText += `err name: ${err.name}\n`;
  // 错误信息
  logText += `err message: ${err.message}\n`;
  // 错误详情
  logText += `err stack: ${err.stack}\n`;

  // 错误信息结束
  logText += '*************** error log end ***************\n';

  return logText;
};

// 封装响应日志
const logResponse = (ctx, resTime) => {
  if (ctx) {
    log4js.getLogger('Http')
      .trace(formatRes(ctx, resTime));
  }
};

// 封装错误日志
const logError = (ctx, err, resTime) => {
  if (ctx && err) {
    log4js.getLogger('Uncaught')
      .error(formatError(ctx, err, resTime));
  }
};

// 封装服务日志
const logServer = (info) => log4js.getLogger('Server').info(info);

module.exports = {
  logResponse,
  logError,
  logServer,
};
