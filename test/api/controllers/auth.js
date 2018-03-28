var should = require('should');
var request = require('supertest');

describe('auth controller', function () {

  describe('POST /login', function () {

    it('should return Not a proper HTTP verb', function (done) {

      request(server)
        .get('/login')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(405)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.should.have.property('message');
          res.body.should.have.property('allowedMethods');

          done();
        });
    });

    it('should return missing credentials', function (done) {

      request(server)
        .post('/login')
        .set('Accept', 'application/json')
        .send({})
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.should.have.property('info');
          res.body.info.message.should.eql('Missing credentials');
          res.body.should.have.property('message');

          done();
        });
    });

    it('should return Login Successful', function (done) {

      request(server)
        .post('/login')
        .set('Accept', 'application/json')
        .send({
          password: 'pass',
          username: 'user'
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);

          res.body.should.have.property('user');
          res.body.should.have.property('expiry');
          res.body.should.have.property('token');
          res.body.user.username.should.eql('user');

          global.token = res.body.token;

          done();
        });
    });

  });

});
