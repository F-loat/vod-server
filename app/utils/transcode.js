const fs = require('fs');
const path = require('path');
const config = require('config');
const ffmpeg = require('fluent-ffmpeg');
const createTorrent = require('create-torrent');
const models = require('../models');

const uploadPath = config.get('uploadPath');
const progressTemp = {};

const create = async (id) => {
  let episode;
  if (id) {
    episode = await models.Episode.findById(id);
  } else {
    episode = await models.Episode.findOne({ state: 0 });
  }
  if (!episode) return;
  if (episode.state === 2) {
    create();
    return;
  }
  episode.state = 1;
  episode.save();
  const episodePath = path.join(uploadPath, episode.path);
  ffmpeg(episodePath)
    .output(`${episodePath}.mp4`)
    .audioCodec('aac')
    .videoCodec('libx264')
    .addOption('-threads', 2)
    .addOption('-movflags', 'faststart')
    .on('error', (err) => {
      progressTemp[episode._id] = undefined;
      episode.state = -1;
      episode.save();
      console.error(err);
    })
    .on('progress', (progress) => {
      progressTemp[episode._id] = progress.percent;
    })
    .on('end', async () => {
      progressTemp[episode._id] = undefined;
      fs.unlinkSync(episodePath);
      createTorrent(`${episodePath}.mp4`, {
        announceList: [['wss://tracker.youngon.com.cn']],
        urlList: [`${config.get('domain')}/assets/${episode.path}.mp4`],
      }, (err, torrent) => {
        if (err) {
          console.error(err);
          return;
        }
        fs.writeFileSync(`${episodePath}.torrent`, torrent);
        episode.state = 2;
        episode.save();
        create();
      });
    })
    .run();
};

const show = id => progressTemp[id];

const destory = () => {
  const command = ffmpeg();
  command.kill('SIGSTOP');
};

const init = async () => {
  destory();
  const episodes = await models.Episode.find({ state: 1 });
  episodes.forEach((episode) => {
    create(episode._id);
  });
};

init();

module.exports = {
  init,
  create,
  show,
  destory,
};
