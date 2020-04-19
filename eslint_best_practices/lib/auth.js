const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require('../models');

passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true,
  failureFlash: true,
}, async (req, username, password, done) => {
  try {
    const user = await models.User.findOne({
      where: {'email': username }
    });
    if(!user) {
      return done(null, false, {message: 'Unable to find this email address'});
    }
    const passwordCheck = await user.checkPassword(password);
    if(!passwordCheck) {
      return done(null, false, {message: 'Invalid password'});
    }
    return done(null, user);
    } catch(err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  return done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await models.User.findByPk(id);
    return done(null, user);
  } catch(err) {
    return done(err);
  }
})
