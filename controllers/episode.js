const fs = require('fs');
const path = require('path');
const config = require('config');
const logger = require('log4js').getLogger('Episode');
const Episode = require('../models/episode');
const transcode = require('../utils/transcode');

const uploadPath = config.get('uploadPath');

exports.add = async (ctx) => {
  const file = ctx.req.file || {};
  const videoPath = file.path;
  const content = path.relative(uploadPath, videoPath);

  ctx.body = { state: 1, content };
};

/**
 * @param type   {String}  查询类型
 * @param limit  {String}  查询条数
 * @param page   {String}  当前页数
 */
exports.list = async (ctx) => {
  const query = { deleted: false };
  const { state, videoId } = ctx.query;
  if (state) query.state = JSON.parse(state);
  if (videoId) query.video = videoId;

  const episodes = await Episode
    .find(query)
    .populate('creater', 'nickname stuid');
  ctx.body = { state: 1, content: episodes };
};

exports.detail = async (ctx) => {
};

exports.transcode = async (ctx) => {
  const transcodingCount = await Episode.count({ state: 1 });
  if (transcodingCount > 2) {
    ctx.body = { state: 0, msg: '超出转码并发限额' };
    return;
  }
  const episode = await Episode.findById(ctx.request.body._id);
  const videoPath = path.join(uploadPath, episode.filePath);
  const parsedPath = path.parse(videoPath);
  const transPath = path.join(parsedPath.dir, parsedPath.name);
  const outputPath = path.join(transPath, 'index.m3u8');
  episode.state = 1;
  episode.save();
  ctx.body = { state: 1, content: true };
  if (!fs.existsSync(transPath)) fs.mkdirSync(transPath);
  try {
    await transcode(videoPath, outputPath);
    fs.unlinkSync(videoPath);
    episode.state = 2;
    episode.filePath = path.relative(uploadPath, outputPath);
    episode.save();
    const nextEpisode = await Episode.findOne({ state: 0 });
    if (nextEpisode) transcode(nextEpisode);
  } catch (err) {
    episode.state = -1;
    episode.save();
    logger.error(err);
  }
};

exports.update = async (ctx) => {
};

exports.delete = async (ctx) => {
};
