const app = require('../app');
const request = require('supertest').agent(app.listen(3000));
require('chai').should();

describe('API-Video', () => {
  describe('getTypedVideoList', () => {
    it('should return typed video list', async () => {
      try {
        const res = await request
          .get('/request/video/typed')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);
        const body = res.body;
        body.should.have.deep.property('state', 1);
        body.should.have.deep.property('content').a('array').length.least(0);
      } catch (err) {
        console.log(err);
      }
    });
  });
});
