'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sitters = sequelize.define('sitters', {
    username: DataTypes.STRING,
    days_available: DataTypes.DATE,
    phone: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {});
  Sitters.associate = function(models) {
    // associations can be defined here
  };
  return Sitters;
};