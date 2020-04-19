const models = require('../models');

exports.getCurrentOrder = async (user) => {
  var currentOrder = null;
  if(user) {
    const orders = await models.Order.findAll({
      where: {
        status: 'current',
        userId: user.id,
      }
    });
    if(orders.length == 1) {
      currentOrder = orders[0];
    }
  }
  console.log("--- user's current order:", JSON.stringify(currentOrder));
  return currentOrder;
}

exports.getCurrentOrderItems = async (user) => {
  var currentOrderItems = null;
  var currentOrder = await this.getCurrentOrder(user);
  if(!currentOrder) {
    return null;
  }
  currentOrderItems = await models.OrderItem.findAll({
    where: {
      orderId: currentOrder.id,
    },
    include: [models.Item],  // TODO: is this redundant?
  });
  console.log('--- current order items: ', JSON.stringify(currentOrderItems));
  return {
    currentOrderItems,
    currentOrder
  };
}

exports.getCurrentOrderTotal = async (user) => {
  var temp = await this.getCurrentOrderItems(user);
  if(!temp) {
    return null;
  }
  var { currentOrderItems, currentOrder } = temp;
  if(currentOrderItems.length == 0) {
    return null;
  }
  var currentOrderTotal = { price: 0, qty: 0};
  for(let i = 0; i < currentOrderItems.length; ++i) {
    var entry = currentOrderItems[i];
    currentOrderTotal.qty += entry.qty;
    currentOrderTotal.price += entry.qty * entry.item.price;
  }
  return {currentOrderItems, currentOrder, currentOrderTotal};
}