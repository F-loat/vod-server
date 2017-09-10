const models = require('../models');

exports.index = async (ctx) => {
  const {
    belong,
    sort = '-createdAt',
    page = 1,
    limit = 10 } = ctx.query;
  const query = {};
  if (belong) query.belong = belong;

  const [comments, total] = await Promise.all([
    models.Comment
      .find(query)
      .sort(sort)
      .populate('creater', 'nickname')
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(Number(limit)),
    models.Comment.count(query),
  ]);

  ctx.body = { comments, total };
};

exports.show = async (ctx) => {
  ctx.body = 'working';
};

exports.create = async (ctx) => {
  const { body } = ctx.request;

  await models.Comment.create({
    belong: body.belong,
    content: body.content,
    creater: ctx.user._id,
  });

  ctx.status = 201;
};

exports.update = async (ctx) => {
  ctx.body = 'working';
};

exports.destroy = async (ctx) => {
  ctx.body = 'working';
};
