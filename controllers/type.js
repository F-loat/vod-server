const Type = require('../models/type');
const logger = require('log4js').getLogger('Type');

exports.add = async (ctx) => {
  const { name, type, sort } = ctx.request.body;
  const lastType = await Type.findOne({ type }).sort({ 'sort': -1 });
  const newType = await Type.create({
    name,
    type,
    creater: ctx.user._id,
    sort: sort || (lastType ? lastType.sort + 1 : 0),
  });
  ctx.body = { state: 1, content: newType };
};

exports.list = async (ctx) => {
  const query = { deleted: false };
  const type = ctx.query.type;
  if (type) query.type = type;

  const types = await Type
    .find(query)
    .populate('creater', 'nickname stuid')
    .sort({ 'sort': 1 });
  ctx.body = { state: 1, content: types };
};

exports.detail = async (ctx) => {
};

exports.update = async (ctx) => {
  const { _id, name, sort } = ctx.request.body;
  try {
    const type = await Type
      .findByIdAndUpdate(_id, {
        $set: { name, sort },
      }, { new: true });
    ctx.body = { state: 1, content: type };
  } catch (err) {
    logger.error(err);
    ctx.body = { state: 0, msg: err };
  }
};

exports.delete = async (ctx) => {
  const _id = ctx.query._id;
  try {
    await Type.update({ _id }, { $set: { deleted: true } });
    ctx.body = { state: 1, content: true };
    logger.info(`视频${_id}被管理员${ctx.user._id}删除`);
  } catch (err) {
    ctx.body = { state: 0, msg: err };
    logger.error(err);
  }
};
