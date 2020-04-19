const express = require('express');
const ordersController = require('../controllers/ordersController');
const {isLoggedIn} = require('../lib/middlewares');

var router = express.Router();

router.get('/checkout', isLoggedIn, ordersController.get_checkout);

router.post('/checkout', isLoggedIn, ordersController.post_checkout);

module.exports = router;