const supertest = require('supertest');
const server = require('../bin/www');
const utils = require('../app/utils');
const models = require('../app/models');
require('chai').should();

const request = supertest.agent(server);

describe('API-Topic', () => {
  beforeEach(async () => {
    const user = await models.User.create({ stuid: '000000' });
    const token = utils.token.create(Object.assign({}, user)));
    const defaultTypeSort = await models.Type.count({ type: 'video' });
    const type = await models.Type.create({
      name: '资源申请',
      type: 'topic',
      creater: user._id,
      sort: defaultTypeSort + 1,
    });
    const topic = await models.Topic.create({
      title: '测试',
      content: '测试测试测试',
      type: type._id,
      author: user._id,
    });
    this.user = user;
    this.token = token;
    this.type = type;
    this.topic = topic;
  });
  afterEach(async () => {
    const { user, type, topic } = this;
    await Promise([
      models.User.remove({ _id: user._id }),
      models.Type.remove({ _id: type._id }),
      models.Topic.remove({ _id: topic._id }),
    ]);
    this.user = null;
    this.token = null;
    this.type = null;
    this.topic = null;
  });

  describe('getTopicList', () => {
    it('should return topic list info', async () => {
      try {
        const res = await utils.t2d.test({
          agent: request,
          file: 'topic',
          group: '论坛相关API',
          title: '获取帖子列表',
          method: 'get',
          url: '/request/topics',
          headers: { Accept: 'application/json' },
          expect: 200,
          params: {
            id: {
              value: this.topic._id,
              type: 'String',
              required: true,
              desc: '帖子Id',
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
          },
        });
        const body = res.body;
        body.should.have.deep.property('state', 1);
      } catch (err) {
        console.log(err);
      }
    });
  });

  describe('getTopicDetail', () => {
    it('should return topic detail info', async () => {
      try {
        const res = await utils.t2d.test({
          agent: request,
          file: 'topic',
          group: '论坛相关API',
          title: '获取帖子详情',
          method: 'get',
          url: `/request/topics/${this.topic._id}`,
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

  describe('addTopic', () => {
    it('should return new topic info', async () => {
      try {
        const res = await utils.t2d.test({
          agent: request,
          file: 'topic',
          group: '论坛相关API',
          title: '新增帖子',
          method: 'post',
          url: '/request/topics',
          headers: { Authorization: `Bearer ${this.token}` },
          expect: 200,
          params: {
            title: {
              value: '发布',
              type: 'String',
              required: true,
              desc: '帖子标题',
            },
            content: {
              value: '发布发布发布',
              type: 'String',
              required: true,
              desc: '帖子内容',
            },
            type: {
              value: this.type._id,
              type: 'String',
              required: true,
              desc: '帖子类型',
            },
          },
        });
        const body = res.body;
        body.should.have.deep.property('state', 1);
        await Topic.remove({ _id: body.content._id });
      } catch (err) {
        console.log(err);
      }
    });
  });
});
