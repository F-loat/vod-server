const supertest = require('supertest');
const server = require('../bin/www');
const t2d = require('../utils/test2doc');
const createToken = require('../utils/token').create;
const verifyToken = require('../utils/token').verify;
const User = require('../models/user');
require('chai').should();

const request = supertest.agent(server);

describe('API-User', () => {
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

  describe('userLogin', () => {
    it('should return login status', async () => {
      try {
        const res = await t2d.test({
          agent: request,
          file: 'user',
          group: '用户相关API',
          title: '用户登录',
          method: 'post',
          url: '/request/user/login',
          expect: 200,
          params: {
            stuid: {
              value: '00000000',
              type: 'String',
              required: true,
              desc: '学号',
            },
            pwd: {
              value: 'test',
              type: 'String',
              required: true,
              desc: '密码',
            },
          },
        });
        const body = res.body;
        body.should.have.deep.property('state', 0);
      } catch (err) {
        console.log(err);
      }
    });
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

describe('Method-User', () => {
  describe('verifyToken', () => {
    it('should return verify faile with 403', async () => {
      const ctx = {
        body: {},
        headers: {},
      };
      const rst = await verifyToken(ctx);
      ctx.should.have.deep.property('status', 403);
      rst.should.to.be.false;
    });
    it('should return verify faile with 401', async () => {
      const ctx = {
        body: {},
        headers: { authorization: 'test' },
      };
      const rst = await verifyToken(ctx);
      ctx.should.have.deep.property('status', 500);
      rst.should.to.be.false;
    });
    it('should return user info', async () => {
      const token = createToken({
        _id: 'testtesttesttest',
        type: 10,
        stuid: '000000',
      });
      const ctx = {
        body: {},
        headers: { authorization: `Bearer ${token}` },
      };
      const rst = await verifyToken(ctx);
      rst.should.have.deep.property('_id', 'testtesttesttest');
      rst.should.have.deep.property('type', 10);
      rst.should.have.deep.property('stuid', '000000');
    });
  });
});
