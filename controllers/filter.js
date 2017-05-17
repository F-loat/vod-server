const token = require('../utils/token');

exports.login = async (ctx, next) => {
  const user = await token.verify(ctx);
  if (user) {
    ctx.user = user;
    await next();
  }
};

exports.admin = async (ctx, next) => {
  const user = await token.verify(ctx);
  if (user && user.type > 9) {
    ctx.user = user;
    await next();
  } else {
    ctx.body = { "state": 0, msg: '管理员可用！' };
  }
};
