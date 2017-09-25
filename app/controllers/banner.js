const fs = require('fs');
const path = require('path');
const config = require('config');
const models = require('../models');

const uploadPath = config.get('uploadPath');

exports.index = async (ctx) => {
  const {
    sort = '-createdAt',
    page = 1,
    limit = 10 } = ctx.query;
  const [banners, total] = await Promise.all([
    models.Banner
      .find()
      .sort(sort)
      .populate('creater', 'nickname')
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(Number(limit)),
    models.Banner.count(),
  ]);
  ctx.body = { banners, total };
};

exports.create = async (ctx) => {
  const { body } = ctx.request;

  const banner = await models.Banner.create({
    title: body.title,
    summary: body.summary,
    type: body.type,
    href: body.href,
    path: body.path,
    creater: ctx.user._id,
  });

  ctx.status = 201;
  ctx.body = banner;
};

exports.update = async (ctx) => {
  ctx.status = 200;
};

exports.destroy = async (ctx) => {
  const _id = ctx.params.id;
  const banner = await models.Banner.findByIdAndRemove(_id);
  const bannerPath = path.join(uploadPath, banner.path);
  if (fs.existsSync(bannerPath)) fs.unlinkSync(bannerPath);
  ctx.status = 200;
  console.info(`轮换图 ${_id} 被管理员 ${ctx.user.username} 删除`);
};
