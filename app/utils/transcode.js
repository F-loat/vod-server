const fs = require('fs');
const path = require('path');
const config = require('config');
const ffmpeg = require('fluent-ffmpeg');
const models = require('../models');

const uploadPath = config.get('uploadPath');

const transcode = async (id) => {
  let episode;
  if (id) {
    episode = await models.Episode.findById(id);
  } else {
    episode = await models.Episode.findOne({ state: 0 });
  }
  if (!episode) return;
  if (episode.state === 1 || episode.state === 2) {
    transcode();
    return;
  }
  episode.state = 1;
  episode.save();
  const videoPath = path.join(uploadPath, episode.path);
  const transPath = `${videoPath}-transcoding`;
  const outputPath = path.join(transPath, 'index.m3u8');
  fs.mkdirSync(transPath);
  ffmpeg(videoPath)
    .output(outputPath)
    .audioCodec('aac')
    .videoCodec('libx264')
    .addOption('-hls_time', 15)
    .addOption('-hls_list_size', 0)
    .addOption('-threads', 2)
    .on('error', (err) => {
      episode.state = -1;
      episode.save();
      console.error(err);
    })
    .on('end', async () => {
      fs.unlinkSync(videoPath);
      episode.state = 2;
      episode.path = path.relative(uploadPath, transPath).replace(/\\/g, '/');
      episode.save();
      transcode();
    })
    .run();
};

module.exports = transcode;
