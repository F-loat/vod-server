const supertest = require('supertest');
const server = require('../bin/www');
const t2d = require('../utils/test2doc');
const createToken = require('../utils/token').create;
const User = require('../models/user');
require('chai').should();

const request = supertest.agent(server);

describe('API-Type', () => {
  beforeEach(async () => {
    const user = await User.create({ stuid: '000000', type: 10 });
    const token = createToken(JSON.parse(JSON.stringify(user)));
    this.user = user;
    this.token = token;
  });
  afterEach(async () => {
    const { user } = this;
    User.remove({ _id: user._id }).exec();
    this.user = null;
    this.token = null;
  });

  describe('getUserList', () => {
    it('should return user list info', async () => {
      try {
        const res = await t2d.test({
          agent: request,
          file: 'user',
          group: '用户相关API',
          title: '*获取用户列表*',
          method: 'get',
          url: '/request/user/list',
          headers: { Authorization: `Bearer ${this.token}` },
          expect: 200,
          params: {
            type: {
              value: null,
              type: 'String',
              required: false,
              desc: '用户类型',
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

  describe('getUserDetail', () => {
    it('should return user detail info', async () => {
      try {
        const res = await t2d.test({
          agent: request,
          file: 'user',
          group: '用户相关API',
          title: '获取用户信息',
          method: 'get',
          url: '/request/user',
          headers: { Authorization: `Bearer ${this.token}` },
          expect: 200,
          params: null,
        });
        const body = res.body;
        body.should.have.deep.property('state', 1);
      } catch (err) {
        console.log(err);
      }
    });
  });

  describe('updateUser', () => {
    it('should return modified user info', async () => {
      try {
        const res = await t2d.test({
          agent: request,
          file: 'user',
          group: '用户相关API',
          title: '*修改用户信息*',
          method: 'put',
          url: '/request/user',
          headers: { Authorization: `Bearer ${this.token}` },
          expect: 200,
          params: {
            _id: {
              value: this.user._id,
              type: 'String',
              required: true,
              desc: '用户Id',
            },
            type: {
              value: 12,
              type: 'Number',
              required: true,
              desc: '用户类型',
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
