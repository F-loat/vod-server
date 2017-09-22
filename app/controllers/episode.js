const fs = require('fs');
const path = require('path');
const config = require('config');
const utils = require('../utils');
const models = require('../models');

const uploadPath = config.get('uploadPath');

/**
 * @param type   {String}  查询类型
 * @param limit  {String}  查询条数
 * @param page   {String}  当前页数
 */
exports.index = async (ctx) => {
  const {
    state,
    belong,
    sort = '-createdAt',
    page = 1,
    limit = 10 } = ctx.query;
  const query = {};
  if (state) query.state = JSON.parse(state);
  if (belong) query.belong = belong;

  const [episodes, total] = await Promise.all([
    models.Episode
      .find(query)
      .sort(sort)
      .populate('creater', 'nickname')
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(Number(limit)),
    models.Episode.count(query),
  ]);

  ctx.body = { episodes, total };
};

exports.show = async (ctx) => {
  const { progress } = ctx.query;

  const episode = await models.Episode
    .findById(ctx.params.id)
    .populate('creater', 'nickname');

  if (Number(progress)) episode.progress = utils.transcode.show(ctx.params.id);
  ctx.body = episode;
};

exports.create = async (ctx) => {
  const { body } = ctx.request;

  const episode = await models.Episode.create({
    name: body.name,
    belong: body.belong,
    path: body.path,
    creater: ctx.user._id,
  });

  ctx.status = 201;
  ctx.body = episode;
};

exports.transcode = async (ctx) => {
  const transcodingCount = await models.Episode.count({ state: 1 });
  if (transcodingCount > 2) {
    ctx.status = 503;
    ctx.body = '超出转码并发限额';
    return;
  }
  await utils.transcode.create(ctx.params.id);
  ctx.status = 202;
};

exports.update = async (ctx) => {
  ctx.body = 'working';
};

exports.destroy = async (ctx) => {
  const episode = await models.Episode.findById(ctx.params.id);
  if (!episode) {
    ctx.status = 400;
    return;
  }
  if (episode.state === 1) {
    ctx.status = 412;
    ctx.body = '转码中的视频不可删除';
    return;
  }
  if (!episode.path) return;
  const episodePath = path.join(uploadPath, episode.path);
  if (fs.existsSync(episodePath)) fs.unlinkSync(episodePath);
  if (fs.existsSync(`${episodePath}.mp4`)) fs.unlinkSync(`${episodePath}.mp4`);
  if (fs.existsSync(`${episodePath}.torrent`)) fs.unlinkSync(`${episodePath}.torrent`);
  episode.remove();

  ctx.status = 200;
};
