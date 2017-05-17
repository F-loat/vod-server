const fs = require('fs');
const path = require('path');
const config = require('config');
const logger = require('log4js').getLogger('Video');
const Video = require('../models/video');
const Episode = require('../models/episode');
const Type = require('../models/type');
const redis = require('../utils/redis');

const uploadPath = config.get('uploadPath');

/**
 * @param title       {String}  标题
 * @param aka         {Array}   关键字
 * @param performers  {Array}   主演
 * @param countries   {Array}   国家
 * @param directors   {Array}   导演
 * @param posterPath {String}  海报位置
 * @param summary     {String}  描述
 * @param year        {String}  年份
 * @param filePath   {String}  文件位置
 * @param episodes    {String}  剧集信息
 * @param type        {String}  类型
 * @param uploaders   {Array}   上传者
 */

exports.add = async (ctx) => {
  const info = ctx.req.body;
  const poster = ctx.req.file || {};
  const posterPath = poster.path;
  const lastVideo = await Video.findOne().sort({ sort: -1 });
  const video = await Video.create({
    title: info.title,
    aka: info.aka.split(','),
    performers: info.performers.split(','),
    countries: info.countries.split(','),
    directors: info.directors.split(','),
    posterPath: path.relative(uploadPath, posterPath),
    summary: info.summary,
    year: info.year,
    type: info.type,
    creater: ctx.user._id,
    sort: info.sort || (lastVideo ? lastVideo.sort + 1 : 0),
  });
  const episodes = JSON.parse(info.episodes);
  const lastEpisode = await Episode
    .findOne({ video: video._id }).sort({ sort: -1 });
  const queue = episodes.map((episode, index) => Episode.create({
    name: episode.name,
    filePath: episode.path,
    video: video._id,
    creater: ctx.user._id,
    sort: lastEpisode ? lastEpisode.sort + index + 1 : 0,
  }));
  await Promise.all(queue);
  ctx.body = { state: 1, content: true };
};

exports.typed = async (ctx) => {
  try {
    const reply = await redis.get('videoTypedLists');
    if (reply) {
      ctx.body = { state: 1, content: JSON.parse(reply) };
      return;
    }

    const types = await Type.find({ type: 'video', deleted: false }).select('name');
    const queue = types.map(type => Video.find({
      type,
      deleted: false,
    }).select('title posterPath').sort({ sort: -1 }).limit(10));

    const results = await Promise.all(queue);
    const lists = results.map((videos, index) => ({
      videos,
      type: types[index],
    }));
    ctx.body = { state: 1, content: lists };

    redis.set('videoTypedLists', JSON.stringify(lists));
    redis.expire('videoTypedLists', 86400);
  } catch (err) {
    ctx.status = 500;
    ctx.body = { state: 0, msg: '服务端错误' };
    logger.error(err);
  }
};

/**
 * @param type   {String}  查询类型
 * @param limit  {String}  查询条数
 * @param page   {String}  查询页数
 */
exports.list = async (ctx) => {
  const query = { deleted: false };
  const { type, limit = 0, page, search } = ctx.query;
  if (type) query.type = type;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: '$i' } },
      { aka: { $regex: search, $options: '$i' } },
    ];
  }

  const result = await Promise.all([
    Video
      .find(query)
      .populate('creater', 'nickname stuid')
      .sort({ sort: -1 })
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(Number(limit)),
    Video.count(query),
  ]);
  const videos = result[0];
  const totalCount = result[1];
  ctx.body = {
    state: 1,
    content: {
      videos,
      totalCount,
    },
  };
};

exports.detail = async (ctx) => {
  try {
    const video = await Video.findById(ctx.query._id);
    if (!video) throw new Error('not exist');
    if (video.deleted === true) throw new Error('deleted');
    ctx.body = { state: 1, content: video };
  } catch (err) {
    logger.error(err);
    ctx.body = { state: 0, msg: err };
  }
};

exports.update = async (ctx) => {
  const info = ctx.req.body;
  const video = await Video.findById(info._id);
  const poster = ctx.req.file;
  if (poster) {
    const posterPath = poster.path;
    const realPath = path.join(uploadPath, video.posterPath);
    if (fs.existsSync(realPath)) fs.unlinkSync(realPath);
    video.posterPath = path.relative(uploadPath, posterPath);
  }
  video.title = info.title;
  video.aka = info.aka.split(',');
  video.performers = info.performers.split(',');
  video.countries = info.countries.split(',');
  video.directors = info.directors.split(',');
  video.summary = info.summary;
  video.year = info.year;
  video.type = info.type;
  video.creater = ctx.user._id;
  video.sort = info.sort || video.sort;
  video.save();
  const episodes = JSON.parse(info.episodes);
  const lastEpisode = await Episode
    .findOne({ video: video._id }).sort({ sort: -1 });
  const queue = episodes.map((episode, index) => Episode.create({
    name: episode.name,
    filePath: episode.path,
    video: video._id,
    creater: ctx.user._id,
    sort: lastEpisode ? lastEpisode.sort + index + 1 : 0,
  }));
  await Promise.all(queue);
  ctx.body = { state: 1, content: video };
};

exports.delete = async (ctx) => {
  const _id = ctx.query._id;
  try {
    await Video.update({ _id }, { $set: { deleted: true } });
    ctx.body = { state: 1, content: true };
    logger.info(`视频${_id}被管理员${ctx.user._id}删除`);
  } catch (err) {
    ctx.body = { state: 0, msg: err };
    logger.error(err);
  }
};
