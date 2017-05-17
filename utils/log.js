const log4js = require('log4js');

/**
 * Configure logger.
 */

try {
  require('fs').mkdirSync('./logs');
} catch (e) {
  if (e.code != 'EEXIST') {
    console.error("Could not set up log directory, error was: ", e);
    process.exit(1);
  }
}

log4js.configure('./config/log4js.json');
log4js.getLogger('Startup').info('Server start');

//格式化响应日志
const formatRes = (ctx, resTime) => {
  let logText = new String();

  //响应日志开始
  logText += "\n" + "*************** response log start ***************" + "\n";

  //添加请求日志
  logText += formatReq(ctx.request, resTime);

  //响应状态码
  logText += "response status: " + ctx.status + "\n";

  //响应内容
  if (ctx.status !== 200) logText += "response body: " + JSON.stringify(ctx.body) + "\n";

  //响应日志结束
  logText += "*************** response log end ***************" + "\n";

  return logText;

}

//格式化请求日志
const formatReq = (req, resTime) => {

  var logText = new String();

  var method = req.method;
  //访问方法
  logText += "request method: " + method + "\n";

  //请求原始地址
  logText += "request originalUrl:  " + req.originalUrl + "\n";

  //客户端ip
  logText += "request client ip:  " + req.ip + "\n";

  //服务器响应时间
  logText += "response time: " + resTime + "\n";

  return logText;
}

//格式化错误日志
const formatError = (ctx, err, resTime) => {
  var logText = new String();

  //错误信息开始
  logText += "\n" + "*************** error log start ***************" + "\n";

  //添加请求日志
  logText += formatReq(ctx.request, resTime);

  //错误名称
  logText += "err name: " + err.name + "\n";
  //错误信息
  logText += "err message: " + err.message + "\n";
  //错误详情
  logText += "err stack: " + err.stack + "\n";

  //错误信息结束
  logText += "*************** error log end ***************" + "\n";

  return logText;
};

//封装响应日志
const logResponse = (ctx, resTime) => {
  if (ctx) {
    log4js.getLogger('Http')
      .trace(formatRes(ctx, resTime));
  }
};

//封装错误日志
const logError = (ctx, err, resTime) => {
  if (ctx && err) {
    log4js.getLogger('Uncaught')
      .error(formatError(ctx, err, resTime));
  }
};

module.exports = {
  logResponse,
  logError,
};
