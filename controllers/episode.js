const fs = require('fs');
const path = require('path');
const config = require('config');
const ffmpeg = require('fluent-ffmpeg');
const Episode = require('../models/episode');
const logger = require('log4js').getLogger('Episode');
const uploadPath = config.get('uploadPath');

function transcode(episode) {
  const videoPath = path.join(uploadPath, episode.filePath);
  const parsedPath = path.parse(videoPath);
  const transPath = path.join(parsedPath.dir, parsedPath.name);
  const outputPath = path.join(transPath, 'index.m3u8');

  if (!fs.existsSync(transPath)) fs.mkdirSync(transPath);
  episode.state = 1;
  episode.save();

  ffmpeg(videoPath)
    .output(outputPath)
    .audioCodec('aac')
    .videoCodec('libx264')
    .addOption('-hls_time', 10)
    .addOption('-hls_list_size', 0)
    .on('end', async function() {
      fs.unlinkSync(videoPath);
      episode.state = 2;
      episode.filePath = path.relative(uploadPath, outputPath);
      episode.save();
      const nextEpisode = await Episode.findOne({ state: 0 });
      if (nextEpisode) transcode(nextEpisode);
    })
    .on('error', function(err) {
      episode.state = -1;
      episode.save();
      logger.error(err);
    })
    .run();
};

exports.add = async function (req, res) {
  if (!req.file) req.file = {};
  const videoPath = req.file.path;
  const content = path.relative(uploadPath, videoPath);

  res.json({ state: 1, content });
};

/**
 * @param type   {String}  查询类型
 * @param limit  {String}  查询条数
 * @param page   {String}  当前页数
 */
exports.list = async function (req, res) {
  const query = { deleted: false };
  const { state, videoId } = req.query;
  if (state) query.state = state;
  if (videoId) query.video = videoId;

  const episodes = await Episode
    .find(query)
    .populate('creater', 'nickname stuid');
  res.json({ state: 1, content: episodes })
};

exports.detail = async function (req, res) {
};

exports.transcode = async function (req, res) {
  const transcodingCount = await Episode.count({ state: 1 });
  if (transcodingCount > 2) {
    res.json({ state: 0, msg: '超出转码并发限额' });
    return;
  }
  const episode = await Episode.findById(req.body._id);
  transcode(episode);
  res.json({ state: 1, content: true });
};

exports.update = async function (req, res) {
};

exports.delete = async function (req, res) {
};
