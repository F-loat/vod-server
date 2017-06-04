const { Topic } = require('../models');

exports.add = async (ctx) => {
  const { title, content, type } = ctx.request.body;
  const lastTopic = await Topic.findOne({ type }).sort({ sort: -1 });
  const newTopic = await Topic.create({
    title,
    content,
    type,
    author: ctx.user._id,
    sort: lastTopic ? lastTopic.sort + 1 : 0,
  });
  ctx.body = { state: 1, content: newTopic };
};

exports.list = async (ctx) => {
  const query = { deleted: false };
  const { type, limit = 10, page = 1 } = ctx.query;
  if (type) query.type = type;

  const result = await Promise.all([
    Topic
      .find(query)
      .populate('author', 'nickname stuid avatar')
      .sort({ sort: -1 })
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(Number(limit)),
    Topic.count(query),
  ]);
  const topics = result[0];
  const totalCount = result[1];
  ctx.body = {
    state: 1,
    content: {
      topics,
      totalCount,
    },
  };
};

exports.detail = async (ctx) => {
  try {
    const topic = await Topic.findById(ctx.query.id);
    if (!topic) throw new Error('not exist');
    if (topic.deleted === true) throw new Error('deleted');
    ctx.body = { state: 1, content: topic };
  } catch (err) {
    console.error(err);
    ctx.body = { state: 0, msg: err.message };
  }
};

exports.update = async (ctx) => {
};

exports.delete = async (ctx) => {
};
