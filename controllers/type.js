const Type = require('../models/type');
const logger = require('log4js').getLogger('Type');

exports.add = async function (req, res) {
  const { name, type, sort } = req.body;
  const lastType = await Type.findOne({ type }).sort({ 'sort': -1 });
  const newType = await Type.create({
    name,
    type,
    creater: req.user._id,
    sort: sort || (lastType ? lastType.sort + 1 : 0),
  });
  res.json({ state: 1, content: newType });
};

exports.list = async function (req, res) {
  const query = { deleted: false };
  const type = req.query.type;
  if (type) query.type = type;

  const types = await Type
    .find(query)
    .populate('creater', 'nickname stuid')
    .sort({ 'sort': 1 });
  res.json({ state: 1, content: types });
};

exports.detail = async function (req, res) {
};

exports.update = async function (req, res) {
  const { _id, name, sort } = req.body;
  try {
    const type = await Type
      .findByIdAndUpdate(_id, {
        $set: { name, sort },
      }, { new: true });
    res.json({ state: 1, content: type });
  } catch (err) {
    logger.error(err);
    res.json({ state: 0, msg: err });
  }
};

exports.delete = async function (req, res) {
  const _id = req.query._id;
  Type
    .update({ _id: _id }, { $set: { deleted: true } })
    .then(() => res.json({ state: 1, content: true }))
    .catch(err => res.json({ state: 0, msg: err }));
};
