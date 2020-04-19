var models = require('../models');
var helper = require('../lib/helper');

exports.add_item_to_cart = async (req, res, next) => {
  try {
    var item = await models.Item.findByPk(req.params.itemid);
    if(item == null) {
      // Check whether the item exists
      return next(new Error("Item not found and can't be added to cart"));
    } 
    var currentOrder = await helper.getCurrentOrder(req.user);
    if(currentOrder == null) {
      // create a new Order with 'current' status
      currentOrder = models.Order.build({
        status: 'current',
        userId: req.user.id
      });
      currentOrder = await currentOrder.save();
    }
    // find selected item in current order
    var orderEntry = await models.OrderItem.findOne({
      where: {
        itemId: item.id,
        orderId: currentOrder.id,
      },
    });
    if(!orderEntry) {
      // item not in current order
      orderEntry = models.OrderItem.build({
        orderId: currentOrder.id,
        itemId: item.id,
        qty: 0,
      });    
      orderEntry = await orderEntry.save();  
    }
    await orderEntry.increment('qty');
    res.redirect('/catalog');
  } catch(err) {
    return next(err);
  }
}

exports.shopping_cart_list = async (req, res) => {
  const temp = await helper.getCurrentOrderTotal(req.user);
  if(temp === null) {
    req.session.messages.push({
      type: 'warning',
      message: 'You haven\'t put any item into shopping cart',
    })
    res.redirect('/catalog');
  }
  const {currentOrderItems, currentOrderTotal} = temp;
  res.render('shopping_cart', {
    records: currentOrderItems,
    total: currentOrderTotal,
  });
}