const fs = require('fs');
const path = require('path');
const config = require('config');
const ffmpeg = require('fluent-ffmpeg');
const { Episode } = require('../models');
const { transcode } = require('../utils');

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
  ffmpeg(videoPath)
    .output(outputPath)
    .audioCodec('aac')
    .videoCodec('libx264')
    .addOption('-hls_time', 15)
    .addOption('-hls_list_size', 0)
    .addOption('-threads', 2)
    .on('end', async () => {
      fs.unlinkSync(videoPath);
      episode.state = 2;
      episode.filePath = path.relative(uploadPath, outputPath);
      episode.save();
      const nextEpisode = await Episode.findOne({ state: 0 });
      if (nextEpisode) transcode(nextEpisode);
    })
    .on('error', (err) => {
      ctx.body = { state: 0, msg: err.message };
      episode.state = -1;
      episode.save();
      console.error(err);
    })
    .run();
};

exports.update = async (ctx) => {
};

exports.delete = async (ctx) => {
};
