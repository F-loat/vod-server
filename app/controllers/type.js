const models = require('../models');

exports.index = async (ctx) => {
  const {
    type,
    sort = '-createdAt',
    page = 1,
    limit = 10 } = ctx.query;
  const query = {};
  if (type) query.type = type;

  const [types, total] = await Promise.all([
    models.Type
      .find(query)
      .sort(sort)
      .populate('creater', 'nickname')
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(Number(limit)),
    models.Type.count(query),
  ]);

  ctx.body = { types, total };
};

exports.show = async (ctx) => {
  const type = await models.Type.findById(ctx.params.id);
  ctx.body = type;
};

exports.create = async (ctx) => {
  const { body } = ctx.request;

  const type = await models.Type.create({
    name: body.name,
    type: body.type,
    creater: ctx.user._id,
  });

  ctx.status = 201;
  ctx.body = type;
};

exports.update = async (ctx) => {
  const _id = ctx.params.id;
  const { name } = ctx.request.body;
  await models.Type.update({ _id }, { name });
  ctx.status = 200;
};

exports.destroy = async (ctx) => {
  const _id = ctx.params.id;
  await models.Type.remove({ _id });
  ctx.status = 200;
  console.info(`视频 ${_id} 被管理员 ${ctx.user.username} 删除`);
};
