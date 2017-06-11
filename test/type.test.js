const supertest = require('supertest');
const server = require('../bin/www');
const { t2d } = require('../utils');
const createToken = require('../utils/token').create;
const { User, Type } = require('../models');
require('chai').should();

const request = supertest.agent(server);

describe('API-Type', () => {
  beforeEach(async () => {
    const user = await User.create({ stuid: '000000', type: 10 });
    const token = createToken(JSON.parse(JSON.stringify(user)));
    const defaultTypeSort = await Type.count({ type: 'video' });
    const type = await Type.create({
      name: '电影',
      type: 'video',
      creater: user._id,
      sort: defaultTypeSort + 1,
    });
    this.user = user;
    this.token = token;
    this.type = type;
  });
  afterEach(async () => {
    const { user, type } = this;
    User.remove({ _id: user._id }).exec();
    Type.remove({ _id: type._id }).exec();
    this.user = null;
    this.token = null;
    this.type = null;
  });

  describe('getTypeList', () => {
    it('should return type list', async () => {
      try {
        const res = await t2d.test({
          agent: request,
          file: 'type',
          group: '分类相关API',
          title: '获取分类列表',
          method: 'get',
          url: '/request/type/list',
          headers: { Accept: 'application/json' },
          expect: 200,
          params: {
            type: {
              value: 'video',
              type: 'String',
              required: false,
              desc: '分类类型',
            },
          },
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

  describe('addType', () => {
    it('should return new type info', async () => {
      try {
        const res = await t2d.test({
          agent: request,
          file: 'type',
          group: '分类相关API',
          title: '*新增分类*',
          method: 'post',
          url: '/request/type',
          headers: { Authorization: `Bearer ${this.token}` },
          expect: 200,
          params: {
            name: {
              value: '电视剧',
              type: 'String',
              required: true,
              desc: '分类名称',
            },
            type: {
              value: 'video',
              type: 'String',
              required: true,
              desc: '分类类型',
            },
            sort: {
              value: 6,
              type: 'Number',
              required: false,
              desc: '排序值',
            },
          },
        });
        const body = res.body;
        body.should.have.deep.property('state', 1);
        Type.remove({ _id: body.content._id }).exec();
      } catch (err) {
        console.log(err);
      }
    });
  });

  describe('updateType', () => {
    it('should return modified info', async () => {
      try {
        const res = await t2d.test({
          agent: request,
          file: 'type',
          group: '分类相关API',
          title: '*修改分类*',
          method: 'post',
          url: '/request/type',
          headers: { Authorization: `Bearer ${this.token}` },
          expect: 200,
          params: {
            _id: {
              value: this.type._id,
              type: 'String',
              required: true,
              desc: '分类id',
            },
            name: {
              value: '综艺',
              type: 'String',
              required: true,
              desc: '分类名称',
            },
            sort: {
              value: 12,
              type: 'Number',
              required: false,
              desc: '排序值',
            },
          },
        });
        const body = res.body;
        body.should.have.deep.property('state', 1);
        Type.remove({ _id: body.content._id }).exec();
      } catch (err) {
        console.log(err);
      }
    });
  });

  describe('delType', () => {
    it('should return delete status', async () => {
      try {
        const res = await t2d.test({
          agent: request,
          file: 'type',
          group: '分类相关API',
          title: '*删除分类*',
          method: 'delete',
          url: '/request/type',
          headers: { Authorization: `Bearer ${this.token}` },
          expect: 200,
          params: {
            _id: {
              value: this.type._id,
              type: 'String',
              required: true,
              desc: '分类Id',
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
