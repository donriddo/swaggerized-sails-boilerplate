var should = require('should');
var request = require('supertest');

describe('thumbnail controller', function () {

  describe('POST /thumbnail', function () {

    it('should return Unauthorized', function (done) {

      request(server)
        .post('/thumbnail')
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
          .post('/thumbnail')
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
          .post('/thumbnail')
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


    it('should return imageURL must be set',
      function (done) {

        request(server)
          .post('/thumbnail')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send({})
          .expect(400)
          .end(function (err, res) {
            should.not.exist(err);
            res.body.should.have.property('message');
            res.body.message.should.eql('`imageURL` must be set');
            done();
          });
      });

    it('should return error downloading image',
      function (done) {

        request(server)
          .post('/thumbnail')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send({ imageURL: 'invalid' })
          .expect(400)
          .end(function (err, res) {
            should.not.exist(err);
            res.body.should.have.property('message');
            res.body.should.have.property('err');
            res.body.message.should.eql('Error downloading image');
            done();
          });
      });

    it('should return Thumbnail creation successful',
      function (done) {

        request(server)
          .post('/thumbnail')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .send({
            imageURL: 'https://lagunita.stanford.edu/c4x/Engineering/' +
              'Networking-SP/asset/networking_tile.jpg'
          })
          .expect(200)
          .end(function (err, res) {
            should.not.exist(err);
            res.should.have.property('body');
            done();
          });
      });

  });

});
