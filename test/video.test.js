const supertest = require('supertest');
const server = require('../bin/www');
const utils = require('../app/utils');
const models = require('../app/models');
require('chai').should();

const request = supertest.agent(server);

describe('API-Video', () => {
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
    this.user = user;
    this.token = token;
    this.type = type;
    this.video = video;
  });
  afterEach(async () => {
    const { user, type, video } = this;
    await Promise.all([
      models.User.remove({ _id: user._id }),
      models.Type.remove({ _id: type._id }),
      models.Video.remove({ _id: video._id }),
    ]);
    this.user = null;
    this.token = null;
    this.type = null;
    this.video = null;
  });
  after(async () => {
    if (process.env.GEN_DOC > 0) utils.t2d.generate();
  });

  describe('getVideoList', () => {
    it('should return video list', async () => {
      try {
        const res = await utils.t2d.test({
          agent: request,
          file: 'video',
          group: '视频相关API',
          title: '获取视频列表',
          method: 'get',
          url: '/request/videos',
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
              value: '搜索',
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
        const res = await utils.t2d.test({
          agent: request,
          file: 'video',
          group: '视频相关API',
          title: '获取视频详情',
          method: 'get',
          url: `/request/videos/${this.video._id}`,
          headers: { Accept: 'application/json' },
          expect: 200,
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
        const res = await utils.t2d.test({
          agent: request,
          file: 'video',
          group: '视频相关API',
          title: '*新增视频*',
          method: 'post',
          url: '/request/videos',
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
        await models.Video.remove({ _id: body.content._id });
      } catch (err) {
        console.log(err);
      }
    });
  });

  describe('updateVideo', () => {
    it('should return modified video info', async () => {
      try {
        const res = await utils.t2d.test({
          agent: request,
          file: 'video',
          group: '视频相关API',
          title: '*修改视频*',
          method: 'put',
          url: `/request/videos/${this.video._id}`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${this.token}`,
          },
          expect: 200,
          params: {
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
        const res = await utils.t2d.test({
          agent: request,
          file: 'video',
          group: '视频相关API',
          title: '*删除视频*',
          method: 'delete',
          url: `/request/videos/${this.video._id}`,
          headers: { Authorization: `Bearer ${this.token}` },
          expect: 200,
        });
        const body = res.body;
        body.should.have.deep.property('state', 1);
      } catch (err) {
        console.log(err);
      }
    });
  });
});
