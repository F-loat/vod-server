const { token } = require('../utils');

exports.login = async (ctx, next) => {
  const user = await token.verify(ctx);
  if (user) {
    ctx.user = user;
    await next();
  }
};

exports.admin = async (ctx, next) => {
  const user = await token.verify(ctx);
  if (user && user.type === 'admin') {
    ctx.user = user;
    await next();
  }
};
