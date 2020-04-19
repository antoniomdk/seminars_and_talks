/* eslint-disable require-atomic-updates */
'use strict';
const bcrypt = require('bcrypt');

const saltRound = 12;

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.VIRTUAL,
      get: function() {
        return `/user/${this.getDataValue('id')}`;
      }
    },
  });

  User.beforeCreate(async (user) => {
    const hashed = await bcrypt.hash(user.password, saltRound);
    user.password = hashed;
})


// This is an instance method
  User.prototype.checkPassword = async function (input) {
    return await bcrypt.compare(input, this.password);
  }

  User.associate = function(models) {
    models.User.hasMany(models.Item, {
      as: 'soldItems', 
      onDelete: "CASCADE",
      foreignKey: {
        name: 'sellerId',
        allowNull: false
      }
    });
    models.User.hasMany(models.Order, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return User;
};

/*
// This is a class method (static)
User.classMethod = function (params) {
  // Do something with params
}
*/
