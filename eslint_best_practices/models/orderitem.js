'use strict'
module.exports = (sequelize, DataTypes) => {
  var OrderItem = sequelize.define('orderItem', {
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.VIRTUAL,
      get: function() {
        return `/orderitem/${this.getDataValue('id')}`;
      }
    },
  });

  OrderItem.associate = function(models) {
    models.OrderItem.belongsTo(models.Order, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
      },
    });
    models.OrderItem.belongsTo(models.Item, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
      },
    });
  }

  return OrderItem;
}