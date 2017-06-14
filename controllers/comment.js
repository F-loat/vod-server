const { Comment } = require('../models');

exports.add = async (ctx) => {
  const { id, content, reply } = ctx.request.body;
  const newComment = await Comment.create({
    subject: id,
    content,
    commenter: ctx.user._id,
    reply,
  });
  ctx.body = { state: 1, content: newComment };
};

exports.list = async (ctx) => {
  const query = {
    subject: ctx.query.id,
    deleted: false,
  };
  const comments = await Comment
    .find(query)
    .populate('commenter', 'nickname stuid avatar')
    .sort({ createdAt: -1 });
  ctx.body = { state: 1, content: comments };
};

exports.detail = async (ctx) => {
};

exports.update = async (ctx) => {
};

exports.delete = async (ctx) => {
};
