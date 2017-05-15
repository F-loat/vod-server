var ffmpeg = require('fluent-ffmpeg');

// make sure you set the correct path to your video file
var proc = ffmpeg('./mv.mp4')
  .output('path/target_270p.m3u8')
  .audioCodec('aac')
  .videoCodec('libx264')
  .addOption('-hls_time', 0)
  .addOption('-hls_list_size', 0)
  .size('?x270')

  .output('path/target_480p.m3u8')
  .audioCodec('aac')
  .videoCodec('libx264')
  .addOption('-hls_time', 0)
  .addOption('-hls_list_size', 0)
  .size('?x480')

  .output('path/target_720p.m3u8')
  .audioCodec('aac')
  .videoCodec('libx264')
  .addOption('-hls_time', 0)
  .addOption('-hls_list_size', 0)
  .size('?x720')

  // .screenshots({
  //   timestamps: [5],
  //   filename: 'screenshot.png',
  //   folder: 'path/',
  //   size: '?x270'
  // })
  .on('progress', function(info) {
    console.log(info);
  })
  .on('end', function() {
    console.log('file has been converted succesfully');
  })
  .on('error', function(err) {
    console.log('an error happened: ' + err.message);
  })
  .run();
