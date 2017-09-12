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
      .populate('creater', 'nickname avatar')
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
  const { type } = ctx.query;

  if (type !== 'topic' && type !== 'video') {
    ctx.status = 400;
    return;
  }

  await models.Comment.create({
    belong: body.belong,
    content: body.content,
    creater: ctx.user._id,
  });

  if (type === 'topic') {
    await models.Topic.update({
      _id: body.belong,
    }, {
      $inc: { reply: 1 },
    });
  } else if (type === 'video') {
    await models.Video.update({
      _id: body.belong,
    }, {
      $inc: { reply: 1 },
    });
  }

  ctx.status = 201;
};

exports.update = async (ctx) => {
  ctx.body = 'working';
};

exports.destroy = async (ctx) => {
  const { type } = ctx.query;

  if (type !== 'topic' && type !== 'video') {
    ctx.status = 400;
    return;
  }

  const video = await models.Video.findByIdAndRemove(ctx.params.id);

  if (type === 'topic') {
    await models.Topic.update({
      _id: video.belong,
    }, {
      $inc: { reply: -1 },
    });
  } else if (type === 'video') {
    await models.Video.update({
      _id: video.belong,
    }, {
      $inc: { reply: -1 },
    });
  }

  ctx.status = 200;
};
