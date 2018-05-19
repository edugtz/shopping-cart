'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};