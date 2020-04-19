var express = require('express');
var usersController = require('../controllers/usersController');
var csrf = require('csurf');
var {notLoggedIn, isLoggedIn} = require('../lib/middlewares');

var router = express.Router();

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/signup', notLoggedIn, usersController.users_signup_get);

router.post('/signup', usersController.users_signup_post);

router.get('/signin', notLoggedIn, usersController.users_signin_get);

router.post('/signin', usersController.users_signin_post);

router.get('/logout', isLoggedIn, usersController.users_logout);

router.get('/:userid', isLoggedIn, usersController.users_detail);

module.exports = router;