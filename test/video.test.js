const supertest = require('supertest');
const server = require('../bin/www');
const redis = require('../utils/redis');
const t2d = require('../utils/test2doc');
const createToken = require('../utils/token').create;
const User = require('../models/user');
const Type = require('../models/type');
const Video = require('../models/video');
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
    this.user = user;
    this.token = token;
    this.type = type;
    this.video = video;
  });
  afterEach(async () => {
    const { user, type, video } = this;
    User.remove({ _id: user._id }).exec();
    Type.remove({ _id: type._id }).exec();
    Video.remove({ _id: video._id }).exec();
    this.user = null;
    this.token = null;
    this.type = null;
    this.video = null;
  });
  after(async () => {
    if (process.env.GEN_DOC > 0) t2d.generate();
  });

  describe('getTypedVideoList', () => {
    redis.del('videoTypedLists');
    it('should return typed video list', async () => {
      try {
        const res = await t2d.test({
          agent: request,
          file: 'video',
          group: '视频相关API',
          title: '获取分类视频列表',
          method: 'get',
          url: '/request/video/typed',
          headers: { Accept: 'application/json' },
          expect: 200,
          params: null,
        });
        const body = res.body;
        body.should.have.deep.property('state', 1);
        body.should.have.deep.property('content')
          .a('array').length.least(0);
      } catch (err) {
        console.log(err);
      }
    });
  });

  describe('getVideoList', () => {
    it('should return video list', async () => {
      try {
        const res = await t2d.test({
          agent: request,
          file: 'video',
          group: '视频相关API',
          title: '获取视频列表',
          method: 'get',
          url: '/request/video/list',
          headers: { Accept: 'application/json' },
          expect: 200,
          params: {
            type: {
              value: this.type._id,
              type: 'String',
              required: true,
              desc: '视频分类Id',
            },
            limit: {
              value: 10,
              type: 'Number',
              required: false,
              desc: '查询条数',
            },
            page: {
              value: 1,
              type: 'Number',
              required: false,
              desc: '查询页数',
            },
            search: {
              value: '测',
              type: 'String',
              required: false,
              desc: '搜索条件',
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

  describe('getVideoDetail', () => {
    it('should return video detail info', async () => {
      try {
        const res = await t2d.test({
          agent: request,
          file: 'video',
          group: '视频相关API',
          title: '获取视频详情',
          method: 'get',
          url: '/request/video',
          headers: { Accept: 'application/json' },
          expect: 200,
          params: {
            _id: {
              value: this.video._id,
              type: 'String',
              required: true,
              desc: '视频Id',
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

  describe('addVideo', () => {
    it('should return add status', async () => {
      try {
        const res = await t2d.test({
          agent: request,
          file: 'video',
          group: '视频相关API',
          title: '*新增视频*',
          method: 'post',
          url: '/request/video',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${this.token}`,
          },
          expect: 200,
          params: {
            title: {
              value: '测试',
              type: 'String',
              required: true,
              desc: '标题',
            },
            aka: {
              value: '测试,测试',
              type: 'String',
              required: true,
              desc: '关键字',
            },
            performers: {
              value: '测试,测试',
              type: 'String',
              required: true,
              desc: '演员',
            },
            countries: {
              value: '测试,测试',
              type: 'String',
              required: true,
              desc: '国家',
            },
            directors: {
              value: '测试,测试',
              type: 'String',
              required: true,
              desc: '导演',
            },
            poster: {
              value: `poster/2017/5/17/${Date.now()}`,
              type: 'File',
              required: true,
              desc: '海报',
            },
            summary: {
              value: '测试',
              type: 'String',
              required: true,
              desc: '描述',
            },
            year: {
              value: '2017',
              type: 'String',
              required: true,
              desc: '年份',
            },
            type: {
              value: this.type._id,
              type: 'String',
              required: true,
              desc: '类型',
            },
            creater: {
              value: this.user._id,
              type: 'String',
              required: true,
              desc: '创建人',
            },
            sort: {
              value: 6,
              type: 'String',
              required: true,
              desc: '排序值',
            },
          },
        });
        const body = res.body;
        body.should.have.deep.property('state', 1);
        Video.remove({ _id: body.content._id }).exec();
      } catch (err) {
        console.log(err);
      }
    });
  });

  describe('updateVideo', () => {
    it('should return modified video info', async () => {
      try {
        const res = await t2d.test({
          agent: request,
          file: 'video',
          group: '视频相关API',
          title: '*修改视频*',
          method: 'put',
          url: '/request/video',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${this.token}`,
          },
          expect: 200,
          params: {
            _id: {
              value: this.video._id,
              type: 'String',
              required: true,
              desc: '视频Id',
            },
            title: {
              value: '修改',
              type: 'String',
              required: true,
              desc: '标题',
            },
            aka: {
              value: '修改,修改',
              type: 'String',
              required: true,
              desc: '关键字',
            },
            performers: {
              value: '修改,修改',
              type: 'String',
              required: true,
              desc: '演员',
            },
            countries: {
              value: '修改,修改',
              type: 'String',
              required: true,
              desc: '国家',
            },
            directors: {
              value: '修改,修改',
              type: 'String',
              required: true,
              desc: '导演',
            },
            poster: {
              value: `poster/2017/5/17/${Date.now()}`,
              type: 'File',
              required: true,
              desc: '海报',
            },
            summary: {
              value: '修改',
              type: 'String',
              required: true,
              desc: '描述',
            },
            year: {
              value: '2018',
              type: 'String',
              required: true,
              desc: '年份',
            },
            type: {
              value: this.type._id,
              type: 'String',
              required: true,
              desc: '类型',
            },
            creater: {
              value: this.user._id,
              type: 'String',
              required: true,
              desc: '创建人',
            },
            sort: {
              value: 6,
              type: 'String',
              required: true,
              desc: '排序值',
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

  describe('delVideo', () => {
    it('should return delete status', async () => {
      try {
        const res = await t2d.test({
          agent: request,
          file: 'video',
          group: '视频相关API',
          title: '*删除视频*',
          method: 'delete',
          url: '/request/video',
          headers: { Authorization: `Bearer ${this.token}` },
          expect: 200,
          params: {
            _id: {
              value: this.video._id,
              type: 'String',
              required: true,
              desc: '视频Id',
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
