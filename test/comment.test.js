const supertest = require('supertest');
const server = require('../bin/www');
const utils = require('../app/utils');
const models = require('../app/models');
require('chai').should();

const request = supertest.agent(server);

describe('API-Comment', () => {
  beforeEach(async () => {
    const user = await models.User.create({ stuid: '000000' });
    const token = utils.token.create(Object.assign({}, user)));
    const type = await models.Type.create({
      name: '资源申请',
      type: 'topic',
      creater: user._id,
    });
    const topic = await models.Topic.create({
      title: '测试',
      content: '测试测试测试',
      type: type._id,
      author: user._id,
    });
    const comment = await models.Comment.create({
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
    await Promise.all([
      models.User.remove({ _id: user._id }),
      models.Type.remove({ _id: type._id }),
      models.Topic.remove({ _id: topic._id }),
      models.Comment.remove({ _id: comment._id }),
    ]);
    this.user = null;
    this.token = null;
    this.type = null;
    this.topic = null;
    this.comment = null;
  });

  describe('getCommentList', () => {
    it('should return comment list info', async () => {
      try {
        const res = await utils.t2d.test({
          agent: request,
          file: 'comment',
          group: '评论相关API',
          title: '获取评论列表',
          method: 'get',
          url: '/request/comments',
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
        res.should.have.deep.property('status', 200);
      } catch (err) {
        console.log(err);
      }
    });
  });

  describe('addComment', () => {
    it('should return new comment info', async () => {
      try {
        const res = await utils.t2d.test({
          agent: request,
          file: 'comment',
          group: '评论相关API',
          title: '新增评论',
          method: 'post',
          url: '/request/comments',
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
        res.should.have.deep.property('status', 200);
        await Comment.remove({ _id: body.content._id });
      } catch (err) {
        console.log(err);
      }
    });
  });
});
