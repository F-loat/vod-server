const supertest = require('supertest');
const server = require('../bin/www');
const utils = require('../app/utils');
const models = require('../app/models');
require('chai').should();

const request = supertest.agent(server);

describe('API-Danmaku', () => {
  beforeEach(async () => {
    const user = await models.User.create({ stuid: '000000' });
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
    const danmaku = await models.Danmaku.create({
      player: video._id,
      author: user._id,
      time: Math.ceil(Math.random() * 100),
      text: '测试',
      color: '#fff',
      type: 'right',
      ip: '127.0.0.1',
      referer: 'localhost:test',
    });
    this.user = user;
    this.token = token;
    this.type = type;
    this.video = video;
    this.danmaku = danmaku;
  });
  afterEach(async () => {
    const { user, type, video, danmaku } = this;
    await Promise.all([
      models.User.remove({ _id: user._id }),
      models.Type.remove({ _id: type._id }),
      models.Video.remove({ _id: video._id }),
      models.Danmaku.remove({ _id: danmaku._id }),
    ]);
    this.token = null;
    this.type = null;
    this.video = null;
    this.danmaku = null;
  });

  describe('getDanmaku', () => {
    it('should return danmaku list', async () => {
      try {
        const res = await utils.t2d.test({
          agent: request,
          file: 'danmaku',
          group: '弹幕相关API',
          title: '获取弹幕列表',
          method: 'get',
          url: '/request/danmakus',
          headers: { Accept: 'application/json' },
          expect: 200,
          params: {
            id: {
              value: this.video._id,
              type: 'String',
              required: true,
              desc: '视频Id',
            },
            max: {
              value: 1000,
              type: 'Number',
              required: false,
              desc: '最大数量',
            },
          },
        });
        const body = res.body;
        body.should.have.deep.property('code', 1);
        body.should.have.deep.property('danmaku')
          .a('array').length.least(0);
      } catch (err) {
        console.log(err);
      }
    });
  });

  describe('addDanmaku', () => {
    it('should return new danmaku info', async () => {
      try {
        const res = await utils.t2d.test({
          agent: request,
          file: 'danmaku',
          group: '弹幕相关API',
          title: '新增弹幕',
          method: 'post',
          url: '/request/danmakus',
          headers: { Authorization: `Bearer ${this.token}` },
          expect: 200,
          params: {
            author: {
              value: this.user._id,
              type: 'String',
              required: true,
              desc: '用户Id',
            },
            color: {
              value: '#fff',
              type: 'String',
              required: true,
              desc: '弹幕颜色',
            },
            player: {
              value: '590bf24bc099e009e78e591c',
              type: 'String',
              required: true,
              desc: '视频Id',
            },
            text: {
              value: '111',
              type: 'String',
              required: true,
              desc: '弹幕内容',
            },
            time: {
              value: 0,
              type: 'Number',
              required: true,
              desc: '弹幕出现时间',
            },
            token: {
              value: 'youngon_vod',
              type: 'String',
              required: true,
              desc: 'token',
            },
            type: {
              value: 'right',
              type: 'String',
              required: true,
              desc: '弹幕类型',
            },
          },
        });
        const body = res.body;
        body.should.have.deep.property('code', 1);
        await models.Danmaku.remove({ _id: body.data._id });
      } catch (err) {
        console.log(err);
      }
    });
  });
});
