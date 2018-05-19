'use strict';
module.exports = (sequelize, DataTypes) => {
  var product = sequelize.define('product', {
    idProduct: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL
  }, {});
  product.associate = function(models) {
    // associations can be defined here
  };
  return product;
};