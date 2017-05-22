const supertest = require('supertest');
const server = require('../bin/www');
const t2d = require('../utils/test2doc');
const createToken = require('../utils/token').create;
const User = require('../models/user');
const Type = require('../models/type');
const Topic = require('../models/topic');
require('chai').should();

const request = supertest.agent(server);

describe('API-Topic', () => {
  beforeEach(async () => {
    const user = await User.create({ stuid: '000000' });
    const token = createToken(JSON.parse(JSON.stringify(user)));
    const lastType = await Type.findOne({ type: 'video' })
      .sort({ sort: -1 });
    const type = await Type.create({
      name: '资源申请',
      type: 'topic',
      creater: user._id,
      sort: lastType ? lastType.sort + 1 : 0,
    });
    const lastTopic = await Topic.findOne({ type }).sort({ sort: -1 });
    const topic = await Topic.create({
      title: '测试',
      content: '测试测试测试',
      type: type._id,
      author: user._id,
      sort: lastTopic ? lastTopic.sort + 1 : 0,
    });
    this.user = user;
    this.token = token;
    this.type = type;
    this.topic = topic;
  });
  afterEach(async () => {
    const { user, type, topic } = this;
    User.remove({ _id: user._id }).exec();
    Type.remove({ _id: type._id }).exec();
    Topic.remove({ _id: topic._id }).exec();
    this.user = null;
    this.token = null;
    this.type = null;
    this.topic = null;
  });

  describe('getTopicList', () => {
    it('should return topic list info', async () => {
      try {
        const res = await t2d.test({
          agent: request,
          file: 'topic',
          group: '论坛相关API',
          title: '获取帖子列表',
          method: 'get',
          url: '/request/topic/list',
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
        const res = await t2d.test({
          agent: request,
          file: 'topic',
          group: '论坛相关API',
          title: '获取帖子详情',
          method: 'get',
          url: '/request/topic',
          headers: { Accept: 'application/json' },
          expect: 200,
          params: {
            id: {
              value: this.topic._id,
              type: 'String',
              required: true,
              desc: '帖子Id',
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

  describe('addTopic', () => {
    it('should return new topic info', async () => {
      try {
        const res = await t2d.test({
          agent: request,
          file: 'topic',
          group: '论坛相关API',
          title: '新增帖子',
          method: 'post',
          url: '/request/topic',
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
        Topic.remove({ _id: body.content._id }).exec();
      } catch (err) {
        console.log(err);
      }
    });
  });
});
