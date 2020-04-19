const middlewares = require('../lib/middlewares');
const models = require('../models');
const fs = require('fs');
const config = require('../config')[process.env.NODE_ENV ||'development'];
const helper = require('../lib/helper');
var {isLoggedIn} = require('../lib/middlewares');

exports.item_list = async (req, res) => {
  const items = await models.Item.findAll();
  const currentTotal = await helper.getCurrentOrderTotal(req.user);
  console.log('current total:', JSON.stringify(currentTotal));
  console.log('item list(items): ', JSON.stringify(items));
  return res.render('index', { title : 'Home', items: items, currentTotal: currentTotal});
}

exports.item_create_get = [
  isLoggedIn, 
  function(req, res) {
  return res.render('items_create', { title: 'Sell item'});
}];

exports.item_create_post = [
  isLoggedIn, 
  middlewares.upload.single('image'),
  middlewares.storeImg,
  async (req, res, next) => {
    try {
      var item = models.Item.build({
        name: req.body.name,
        price: req.body.price,
        qtyAvailable: req.body.qtyAvailable,
        description: req.body.description,
        sellerId: req.user.id,
        // categoryId: req.body.category,
      });
      if(req.file && req.file.imgFilename) {
        item.image = req.file.imgFilename;
      }
      console.log('created item: ', JSON.stringify(item));
      const savedItem = await item.save();
      if(savedItem) {
        return res.redirect(savedItem.url);
      }
      return next(new Error('Unable to save item'));
    } catch(err) {
      if(req.file && req.file.imgFilename) {
        fs.unlink(config.data.getFilepath(req.file.imgFilename), (err) => {
          if(err) next(err);
        })
      }
      return next(err);
    }
  }
];

exports.item_detail = async (req, res, next) => {
  try{
    const item = await models.Item.findByPk(req.params.itemid, {
      include: [
        {model: models.User, as: 'seller'},
        {model: models.Comment},
      ]
    });
    if(item == null) {
      var err = new Error('Item not found');
      err.status = 404;
      return next(err);
    }
    const currentTotal = await helper.getCurrentOrderTotal(req.user);
    return res.render('items_detail', {title: 'Item Detail', item: item, currentTotal: currentTotal });
  } catch(err) {
    return next(err);
  }
}

exports.item_image = (req, res) => {
  const filepath = config.data.getFilepath(req.params.filename);
  res.type('png');
  return res.sendFile(filepath);
}
