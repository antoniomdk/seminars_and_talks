'use strict'
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('comment', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    }
  });

  Comment.associate = function(models) {
    models.Comment.belongsTo(models.User);
    models.Comment.belongsTo(models.Item, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
  }

  return Comment;
}