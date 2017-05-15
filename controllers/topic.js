const Topic = require('../models/topic');

exports.add = async function (req, res) {
  const { title, content, type } = req.body;
  const lastTopic = await Topic.findOne({ type }).sort({ 'sort': -1 });
  const newTopic = await Topic.create({
    title,
    content,
    type,
    author: req.user._id,
    sort: lastTopic ? lastTopic.sort + 1 : 0,
  });
  res.json({ state: 1, content: newTopic });
};

exports.list = async function (req, res) {
  const query = { deleted: false };
  const { type, limit = 0, page } = req.query;
  if (type) query.type = type;

  const result = await Promise.all([
    Topic
      .find(query)
      .populate('author', 'nickname stuid')
      .sort({ 'sort': -1 })
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(Number(limit)),
    Topic.count(query),
  ]);
  const topics = result[0];
  const totalCount = result[1];
  res.json({ state: 1, content: {
    topics,
    totalCount,
  }})
};

exports.detail = async function (req, res) {
  try {
    const topic = await Topic.findById(req.query.id);
    if (topic.deleted === true) throw "deleted";
    res.json({ state: 1, content: topic });
  } catch (err) {
    console.log(err);
    res.json({ state: 0, msg: err });
  }
};

exports.update = async function (req, res) {
};

exports.delete = async function (req, res) {
};
