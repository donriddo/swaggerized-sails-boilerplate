var jwt = require('jsonwebtoken');
const { secret, expiry } = sails.config.settings.jwt;

module.exports = {
  issueToken(payload, expirytime) {
    const expiryTime = expirytime
      ? expirytime
      : expiry;

    var token = jwt.sign(payload, secret, {
      expiresIn: expiryTime
    });


    return token;
  },

  verifyToken(token, cb) {
    return jwt.verify(token, secret, {}, cb);
  }
};
