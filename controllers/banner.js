const path = require('path');
const config = require('config');
const { Banner } = require('../models');

const uploadPath = config.get('uploadPath');

exports.add = async (ctx) => {
  const info = ctx.req.body || ctx.request.body;
  const file = ctx.req.file || {};
  const filePath = file.path;
  const defaultSort = await Banner.count();
  const banner = await Banner.create({
    title: info.title,
    summary: info.summary,
    filePath: filePath && path.relative(uploadPath, filePath),
    href: info.href,
    type: info.type,
    deadline: info.deadline,
    creater: ctx.user._id,
    sort: info.sort || defaultSort + 1,
  });
  ctx.body = { state: 1, content: banner };
};

exports.list = async (ctx) => {
  const banners = await Banner.find().sort({ sort: -1 });
  ctx.body = { state: 1, content: banners };
};

exports.update = async (ctx) => {
};

exports.delete = async (ctx) => {
};
