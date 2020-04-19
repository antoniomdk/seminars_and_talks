const models = require('../models');
const helper = require('../lib/helper');

exports.get_checkout = async (req, res) => {
  const temp = await helper.getCurrentOrderTotal(req.user);
  if(!temp) {
    req.session.messages.push({
      type: 'warning',
      message: 'Your shopping cart is empty.',
    });
    return res.redirect('/cart/shopping-cart');
  }
  var {currentOrderItems, currentOrderTotal} = temp;
  var checkMsgs = req.session.messages;
  var t;
  try {
    t = await models.sequelize.transaction();
    for(let i = 0; i < currentOrderItems.length; i++) {
      const entry = currentOrderItems[i];
      // the query puts a row lock on the associated row in item table
      const itemInEntry = await models.Item.findByPk(entry.itemId, {
        lock: true,
        transaction: t
      });
      if(itemInEntry.qtyAvailable < entry.qty) {
        entry.qty = itemInEntry.qtyAvailable;
        await entry.save({fields: ['qty']});
        checkMsgs.push({
          type: 'warning',
          message: `${entry.item.name} item has only ${itemInEntry.qtyAvailable} left in stock`,          
        })
      }
    }
    if(checkMsgs.length !== 0) {
      checkMsgs.push({
        type: 'warning',
        message: 'The quantity in each order is adjusted according to the quantity left in stock'
      })
    }
    await t.commit();
  } catch(err) {
    checkMsgs.push({
      type: 'error',
      message: 'an error occurred during checkout process, please try again.'
    })
    console.log(err);
  }
  return res.render('checkout_form', {
    records: currentOrderItems,
    total: currentOrderTotal,
  });
}

exports.post_checkout = async (req, res, next) => {
  var temp;
  try {
    temp = await helper.getCurrentOrderTotal(req.user);
    if(!temp) {
      res.redirect('/cart/shopping-cart');
    }
  } catch(err) {
    return next(err);
  }
  var {currentOrderItems, currentOrder, currentOrderTotal} = temp;
  // adjust quantity in stock and charge in a transaction
  var t;
  try {
    t = await models.sequelize.transaction();
    const stripe = require('stripe')('sk_test_1ZzP9XNCmFl73DfSVhhX4sKh005PqsNmly');
    const token = req.body.stripeToken; // Using Express
    // reduce the quantity of items in stock
    for(let i = 0; i < currentOrderItems.length; i++) {
      const entry = currentOrderItems[i];
      var itemInStock = await models.Item.findByPk(entry.itemId, {
        lock: true,
        transaction: t,
      });
      itemInStock.qtyAvailable -= entry.qty;
      await itemInStock.save({fields: ['qtyAvailable']});
    }
    // charge
    (async () => {
      const charge = await stripe.charges.create({
        amount: currentOrderTotal.price * 100,
        currency: 'cad',
        description: 'Example charge',
        source: token,
      });
      currentOrder.paymentId = charge.id;
    })();
    currentOrder.status = 'paid';
    currentOrder.address = req.body.address;
    await currentOrder.save({fields: ['paymentId', 'status', 'address']});
    await t.commit();
  } catch(err) {
    req.session.messages.push({
      type: 'error',
      message: 'Some items have been sold out. Please checkout again'
    })
    res.redirect('/order/checkout');
  }
  res.redirect(currentOrder.url);
}