var should = require('should');
var request = require('supertest');

describe('jsonpatch controller', function () {

  describe('POST /jsonpatch', function () {

    it('should return Unauthorized', function (done) {

      request(server)
        .post('/jsonpatch')
        .set('Accept', 'application/json')
        .send({})
        .expect('Content-Type', /json/)
        .expect(401)
        .end(function (err, res) {
          should.not.exist(err);
          res.body.should.have.property('response');
          res.body.response.should.have.property('message');
          res.body.response.message.should.eql(
            'No Authorization header was found'
          );

          done();
        });
    });

    it('should return Format is Authorization: Bearer [token]',
      function (done) {

        request(server)
          .post('/jsonpatch')
          .set('Accept', 'application/json')
          .set('Authorization', 'Invalid token')
          .send({})
          .expect('Content-Type', /json/)
          .expect(401)
          .end(function (err, res) {
            should.not.exist(err);

            res.body.should.have.property('response');
            res.body.response.should.have.property('message');
            res.body.response.message.should.eql(
              'Format is Authorization: Bearer [token]');

            done();
          });
      });

    it('should return JWT Malformed',
      function (done) {

        request(server)
          .post('/jsonpatch')
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer Invalid')
          .send({})
          .expect('Content-Type', /json/)
          .expect(401)
          .end(function (err, res) {
            should.not.exist(err);

            res.body.should.have.property('response');
            res.body.response.should.have.property('message');
            res.body.response.message.should.eql(
              'jwt malformed');

            done();
          });
      });

    it('should return Error applying patch',
      function (done) {

        request(server)
          .post('/jsonpatch')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send({})
          .expect('Content-Type', /json/)
          .expect(400)
          .end(function (err, res) {
            should.not.exist(err);

            res.body.should.have.property('message');
            res.body.should.have.property('error');
            res.body.message.should.eql(
              'Error applying patch'
            );
            res.body.error.message.should.eql(
              'Patch must be an array of operations'
            );

            done();
          });
      });

    it('should return Error applying patch',
      function (done) {

        request(server)
          .post('/jsonpatch')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send({
            data: {
              'baz': 'qux',
              'foo': 'bar'
            },
            patch: [
              {
                'op': 'replace',
                'path': '/barz',
                'value': 'boo'
              }
            ]
          })
          .expect('Content-Type', /json/)
          .expect(400)
          .end(function (err, res) {
            should.not.exist(err);

            res.body.should.have.property('message');
            res.body.should.have.property('error');
            res.body.message.should.eql(
              'Error applying patch'
            );
            res.body.error.message.should.eql(
              'Replace operation must point to an existing value!'
            );

            done();
          });
      });

    it('should return Patch successful',
      function (done) {

        request(server)
          .post('/jsonpatch')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send({
            data: {
              'baz': 'qux',
              'foo': 'bar'
            },
            patch: [
              {
                'op': 'replace',
                'path': '/baz',
                'value': 'boo'
              }
            ]
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
            should.not.exist(err);

            res.body.should.have.property('message');
            res.body.message.should.eql(
              'Patch Successful'
            );

            done();
          });
      });

  });

});
