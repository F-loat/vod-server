const supertest = require('supertest');
const server = require('../bin/www');
const utils = require('../app/utils');
const models = require('../app/models');
require('chai').should();

const request = supertest.agent(server);

describe('API-Episode', () => {
  beforeEach(async () => {
    const user = await models.User.create({ stuid: '000000', type: 10 });
    const token = utils.token.create(Object.assign({}, user)));
    const type = await models.Type.create({
      name: '电影',
      type: 'video',
      creater: user._id,
    });
    const video = await models.Video.create({
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
    });
    const episode = await models.Episode.create({
      name: '测试',
      filePath: 'episode/2017/5/20/hahaha.mp4',
      video: video._id,
      creater: user._id,
    });
    this.user = user;
    this.token = token;
    this.type = type;
    this.video = video;
    this.episode = episode;
  });
  afterEach(async () => {
    const { user, type, video, episode } = this;
    await Promise.all([
      models.User.remove({ _id: user._id }),
      models.Type.remove({ _id: type._id }),
      models.Video.remove({ _id: video._id }),
      models.Episode.remove({ _id: episode._id }),
    ]);
    this.user = null;
    this.token = null;
    this.type = null;
    this.video = null;
    this.episode = null;
  });

  describe('getEpisodeList', () => {
    it('should return video list', async () => {
      try {
        const res = await utils.t2d.test({
          agent: request,
          file: 'episode',
          group: '剧集相关API',
          title: '获取剧集列表',
          method: 'get',
          url: '/request/episodes',
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
