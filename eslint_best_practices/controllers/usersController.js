/* eslint-disable require-atomic-updates */
var {body, validationResult} = require('express-validator');
var {sanitizeBody} = require('express-validator');
var passport = require('passport');

var models = require('../models');

exports.users_signup_get = (req, res) => {
  res.render('users/signup', { title: 'Sign Up', csrfToken: req.csrfToken() });
}

exports.users_signup_post = [
  body('email').not().isEmpty().withMessage('Email cannot be empty')
  .isEmail().withMessage('Email Address is not valid')
  .custom(async value => {
    const user = await models.User.findOne({
      where: {'email': value},
    });
    if(user) {
      return Promise.reject('E-mail already in use');
    }
  })
  .trim()
  .normalizeEmail(),
  body('password').not().isEmpty().trim().escape(),
  sanitizeBody('username').trim().escape(),
  async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      errors.array().forEach((error) => {
        req.session.messages.push({
          type: 'danger',
          message: error.msg,
        });
      });
      res.render('users/signup', { title: 'Sign Up', csrfToken: req.csrfToken(), user: req.body });
      return;
    }

    try {
      var user = models.User.build({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      });
      const savedUser = await user.save();
      if(savedUser) {
        console.log("successfully saved user");
        return res.redirect('/catalog');
      } else {
        return next(new Error('Unable to save user into mysql'));
      }
    } catch(err) {
      return next(err);
    }
  }
];

exports.users_signin_get = (req, res) => {
  var messages = req.flash('error');
  messages.forEach((error) => req.session.messages.push({message: error}));
  return res.render('users/signin', { title: 'Sign In', csrfToken: req.csrfToken() });
}

exports.users_signin_post = [
  passport.authenticate('local-signin', {
    failureRedirect: '/user/signin',
    failureFlash: true,
  }), (req, res) => {
    // sucessRedirect
    // return res.redirect('/');
    return res.redirect(req.user.url);
  }
]

exports.users_logout = (req, res) => {
  req.logout();
  return res.redirect('/catalog');
}

exports.users_detail = async (req, res) => {
  return res.render('users/profile');
}
