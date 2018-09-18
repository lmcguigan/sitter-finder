'use strict';
module.exports = (sequelize, DataTypes) => {
  const sitter = sequelize.define('sitter', {
    username: DataTypes.STRING,
    days_available: DataTypes.DATE,
    phone: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {});
  sitter.associate = function(models) {
    // associations can be defined here
  };
  return sitter;
};