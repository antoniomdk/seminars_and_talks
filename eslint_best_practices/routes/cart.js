var express = require('express');
var cartsController = require('../controllers/cartsController');
var {isLoggedIn} = require('../lib/middlewares');

var router = express.Router();

router.get('/add-to-cart/:itemid', isLoggedIn, cartsController.add_item_to_cart);

router.get('/shopping-cart', isLoggedIn, cartsController.shopping_cart_list);

module.exports = router;