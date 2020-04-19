'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('item', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    qtyAvailable: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    description:{
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.VIRTUAL,
      get: function() {
        return `/catalog/item/${this.getDataValue('id')}`;
      }
    },
  });

  Item.associate = function (models) {
    models.Item.belongsTo(models.User, { 
      as: 'seller',
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
    models.Item.hasMany(models.Comment, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
    models.Item.belongsTo(models.Category);
    };

  return Item;
};
