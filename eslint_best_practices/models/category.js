'use strict'
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('category', {
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.VIRTUAL,
      get: function() {
        return `/category/${this.getDataValue('id')}`;
      }
    },
  });

  Category.associate = function(models) {
    models.Category.hasMany(models.Item);
  }
  return Category;
}