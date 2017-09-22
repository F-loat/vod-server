const path = require('path');
const config = require('config');

exports.create = async (ctx) => {
  const { file } = ctx.req;

  if (!file || !file.path) {
    ctx.status = 400;
    return;
  }
  const uploadPath = config.get('uploadPath');
  const relativePath = path.relative(uploadPath, file.path);

  ctx.body = relativePath.replace(/\\/g, '/');
};
