/**
* authentication controller
*/

const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = {

  login(req, res) {
    if (req.method === 'POST') {
      passport.authenticate('local', function (err, user, info) {
        if (!user) {
          return res.status(400).json({
            info,
            message: 'Invalid login parameters'
          });
        }

        if (err) {
          return res.status(400).json({
            err,
            message: 'Error logging in'
          });
        }

        const { expiry, secret } = sails.config.settings.jwt;
        const token = jwt.sign(
          _.omit(user, 'password'), secret,
          { expiresIn: expiry }
        );

        jwt.verify(token, secret, function (error, decoded) {

          if (error) return res.status(500).json({
            message: 'Cannot verify token'
          });

          req.user = user;

          return res.status(200).json({
            expiry: decoded.exp,
            message: 'Login Sucessful',
            token,
            user: decoded
          }
          );
        });

      })(req, res);
    } else {
      return res.status(400).json('Not a proper http verb');
    }
  }
};
