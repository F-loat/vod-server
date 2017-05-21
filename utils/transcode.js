const ffmpeg = require('fluent-ffmpeg');

const transcode = (videoPath, outputPath) =>
  new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .output(outputPath)
      .audioCodec('aac')
      .videoCodec('libx264')
      .addOption('-hls_time', 10)
      .addOption('-hls_list_size', 0)
      .on('end', () => resolve())
      .on('error', err => reject(err))
      .run();
  });

module.exports = transcode;
