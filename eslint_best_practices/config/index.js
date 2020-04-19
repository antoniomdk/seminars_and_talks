const path = require('path');

module.exports = {
  development: {
    mongoose: {
      dsn: 'mongodb://localhost/onlineShopDev'
    },
    sequelize: {
      // dsn: 'postgres://user:pass@example.com:5432/dbname',
      dsn: 'mysql://shopping:test@localhost:3306/shopping'
    }, 
    data: {
      itemImage: path.join(__dirname, '../data/itemimage'),
      getFilepath: function (filename)  {
        return path.resolve(`${this.itemImage}/${filename}`);
      }
    },
  },
}