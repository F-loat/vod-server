const models = require('../models');

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
  const { path, title, summary, type, href } = ctx.request.body;

  const banner = await models.Banner.create({
    title,
    summary,
    type,
    href,
    path,
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
  await models.Banner.remove({ _id });
  ctx.status = 200;
  console.info(`轮换图 ${_id} 被管理员 ${ctx.user.username} 删除`);
};
