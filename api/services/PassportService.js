const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var localAuthenticate = function (username, password, done) {
  // must contain both username/password
  if (!username || !password) return done(null, false);

  // accept any username/password pair

  return done(null, {
    password,
    username
  });
};


passport.use(new LocalStrategy({
  passwordField: 'password',
  usernameField: 'username'
}, function (email, password, done) {
  localAuthenticate(email, password, done);
}));


