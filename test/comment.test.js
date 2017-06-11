const supertest = require('supertest');
const server = require('../bin/www');
const { t2d } = require('../utils');
const createToken = require('../utils/token').create;
const { User, Type, Topic, Comment } = require('../models');
require('chai').should();

const request = supertest.agent(server);

describe('API-Comment', () => {
  beforeEach(async () => {
    const user = await User.create({ stuid: '000000' });
    const token = createToken(JSON.parse(JSON.stringify(user)));
    const defaultTypeSort = await Type.count({ type: 'video' });
    const type = await Type.create({
      name: '资源申请',
      type: 'topic',
      creater: user._id,
      sort: defaultTypeSort + 1,
    });
    const topic = await Topic.create({
      title: '测试',
      content: '测试测试测试',
      type: type._id,
      author: user._id,
    });
    const comment = await Comment.create({
      subject: topic._id,
      content: '评论评论评论',
      commenter: user._id,
    });
    this.user = user;
    this.token = token;
    this.type = type;
    this.topic = topic;
    this.comment = comment;
  });
  afterEach(async () => {
    const { user, type, topic, comment } = this;
    User.remove({ _id: user._id }).exec();
    Type.remove({ _id: type._id }).exec();
    Topic.remove({ _id: topic._id }).exec();
    Comment.remove({ _id: comment._id }).exec();
    this.user = null;
    this.token = null;
    this.type = null;
    this.topic = null;
    this.comment = null;
  });

  describe('getCommentList', () => {
    it('should return comment list info', async () => {
      try {
        const res = await t2d.test({
          agent: request,
          file: 'comment',
          group: '评论相关API',
          title: '获取评论列表',
          method: 'get',
          url: '/request/comment/list',
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

  describe('addComment', () => {
    it('should return new comment info', async () => {
      try {
        const res = await t2d.test({
          agent: request,
          file: 'comment',
          group: '评论相关API',
          title: '新增评论',
          method: 'post',
          url: '/request/comment',
          headers: { Authorization: `Bearer ${this.token}` },
          expect: 200,
          params: {
            id: {
              value: this.topic._id,
              type: 'String',
              required: true,
              desc: '帖子Id或视频Id',
            },
            content: {
              value: '发布评论lalala',
              type: 'String',
              required: true,
              desc: '评论内容',
            },
            reply: {
              value: null,
              type: 'String',
              required: false,
              desc: '回复目标',
            },
          },
        });
        const body = res.body;
        body.should.have.deep.property('state', 1);
        Comment.remove({ _id: body.content._id }).exec();
      } catch (err) {
        console.log(err);
      }
    });
  });
});
