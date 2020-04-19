'use strict'
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('order', {
    status: {
        type: DataTypes.ENUM('current', 'paid'),
        allowNull: false,
    }, 
    address: {
      type: DataTypes.STRING,
    },
    paymentId: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.VIRTUAL,
      get: function() {
        return `/order/${this.getDataValue('id')}`;
      }
    },
  })

  Order.associate = function(models) {
    models.Order.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
      },
    });
    models.Order.hasMany(models.OrderItem, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
      },
    });
  }

  return Order;
}