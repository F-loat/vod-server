const models = require('../models');

exports.index = async (ctx) => {
  const {
    type,
    sort = '-createdAt',
    page = 1,
    limit = 10 } = ctx.query;
  const query = {};
  if (type) query.type = type;

  const [topics, total] = await Promise.all([
    models.Topic
      .find(query)
      .sort(sort)
      .populate('creater', 'nickname avatar')
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(Number(limit)),
    models.Topic.count(query),
  ]);

  ctx.body = { topics, total };
};

exports.show = async (ctx) => {
  const topic = await models.Topic
    .findById(ctx.params.id)
    .populate('creater', 'nickname avatar');
  if (!topic) {
    ctx.status = 404;
    return;
  }
  ctx.body = topic;
};

exports.create = async (ctx) => {
  const { title, content, type } = ctx.request.body;
  const topic = await models.Topic.create({
    title,
    content,
    type,
    creater: ctx.user._id,
  });
  ctx.body = topic;
};

exports.update = async (ctx) => {
  ctx.body = 'working';
};

exports.destroy = async (ctx) => {
  ctx.body = 'working';
};
