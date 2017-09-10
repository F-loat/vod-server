const path = require('path');
const config = require('config');
const models = require('../models');

exports.create = async (ctx) => {
  const { file } = ctx.req;

  const realPath = file && file.path;
  if (!realPath) {
    ctx.status = 400;
    return;
  }
  const uploadPath = config.get('uploadPath');
  const relativePath = path.relative(uploadPath, realPath);
  const normalPath = relativePath.replace(/\\/g, '/');
  await models.File.create({
    path: normalPath,
    type: ctx.query.type,
    creater: ctx.user._id,
  });

  ctx.body = normalPath;
};
