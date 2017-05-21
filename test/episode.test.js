const supertest = require('supertest');
const server = require('../bin/www');
const t2d = require('../utils/test2doc');
const createToken = require('../utils/token').create;
const User = require('../models/user');
const Type = require('../models/type');
const Video = require('../models/video');
const Episode = require('../models/episode');
require('chai').should();

const request = supertest.agent(server);

describe('API-Video', () => {
  beforeEach(async () => {
    const user = await User.create({ stuid: '000000', type: 10 });
    const token = createToken(JSON.parse(JSON.stringify(user)));
    const lastType = await Type.findOne({ type: 'video' })
      .sort({ sort: -1 });
    const type = await Type.create({
      name: '电影',
      type: 'video',
      creater: user._id,
      sort: lastType ? lastType.sort + 1 : 0,
    });
    const lastVideo = await Video.findOne().sort({ sort: -1 });
    const video = await Video.create({
      title: '测试',
      aka: ['测试', '测试'],
      performers: ['测试', '测试'],
      countries: ['测试', '测试'],
      directors: ['测试', '测试'],
      posterPath: `poster/2017/5/17/${Date.now()}`,
      summary: '测试',
      year: 2017,
      type: type._id,
      creater: user._id,
      sort: lastVideo ? lastVideo.sort + 1 : 0,
    });
    const lastEpisode = await Episode
      .findOne({ video: video._id }).sort({ sort: -1 });
    const episode = Episode.create({
      name: '测试',
      filePath: 'episode/2017/5/20/hahaha.mp4',
      video: video._id,
      creater: user._id,
      sort: lastEpisode ? lastEpisode.sort + 1 : 0,
    });
    this.user = user;
    this.token = token;
    this.type = type;
    this.video = video;
    this.episode = episode;
  });
  afterEach(async () => {
    const { user, type, video, episode } = this;
    User.remove({ _id: user._id }).exec();
    Type.remove({ _id: type._id }).exec();
    Video.remove({ _id: video._id }).exec();
    Episode.remove({ _id: episode._id }).exec();
    this.user = null;
    this.token = null;
    this.type = null;
    this.video = null;
    this.episode = null;
  });
  after(async () => {
    if (process.env.GEN_DOC > 0) t2d.generate();
  });

  describe('getEpisodeList', () => {
    it('should return video list', async () => {
      try {
        const res = await t2d.test({
          agent: request,
          file: 'episode',
          group: '剧集相关API',
          title: '获取视频列表',
          method: 'get',
          url: '/request/episode/list',
          headers: { Accept: 'application/json' },
          expect: 200,
          params: {
            videoId: {
              value: this.video._id,
              type: 'String',
              required: true,
              desc: '视频Id',
            },
            state: {
              value: '[0]',
              type: 'String',
              required: false,
              desc: '剧集状态',
            },
          },
        });
        const body = res.body;
        body.should.have.deep.property('state', 1);
      } catch (err) {
        console.log(err);
      }
    });
  });
});
