const Comment = require('../models/comment');

exports.add = async function (req, res) {
  const { id, content, reply } = req.body;
  const newComment = await Comment.create({
    subject: id,
    content,
    commenter: req.user._id,
    reply,
  });
  res.json({ state: 1, content: newComment });
};

exports.list = async function (req, res) {
  const query = {
    subject: req.query.id,
    deleted: false,
  };
  const comments = await Comment
    .find(query)
    .populate('commenter', 'nickname stuid')
    .sort({ 'createdAt': -1 });
  res.json({ state: 1, content: comments });
};

exports.detail = async function (req, res) {
};

exports.update = async function (req, res) {
};

exports.delete = async function (req, res) {
};
