var should = require('should');
var request = require('supertest');

describe('hello_world controller', function () {

  describe('GET /invalid', function () {

    it('should return a default string', function (done) {

      request(server)
        .get('/invalid')
        .set('Accept', 'application/json')
        .expect(404)
        .end(function (err, res) {
          should.not.exist(err);

          res.should.have.property('body');

          done();
        });
    });

  });

  describe('GET /hello', function () {

    it('should return a default string', function (done) {

      request(server)
        .get('/hello')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);

          res.body.should.eql('Hello, stranger!');

          done();
        });
    });

    it('should accept a name parameter', function (done) {

      request(server)
        .get('/hello')
        .query({ name: 'Scott' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);

          res.body.should.eql('Hello, Scott!');

          done();
        });
    });

  });

});
