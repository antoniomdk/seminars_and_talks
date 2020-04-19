const express = require('express');
const csrf = require('csurf');
const itemsController = require('../controllers/itemsController');

const router = express.Router();

var csrfProtection = csrf();
router.unsubscribe(csrfProtection);

router.get('/', itemsController.item_list);

router.get('/item/create', itemsController.item_create_get);

router.post('/item/create', itemsController.item_create_post);

router.get('/item/:itemid', itemsController.item_detail);

router.get('/image/:filename', itemsController.item_image);

module.exports = router;

