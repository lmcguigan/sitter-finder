'use strict';
module.exports = (sequelize, DataTypes) => {
  const sitters = sequelize.define('sitters', {
    username: DataTypes.STRING,
    days_available: DataTypes.DATE,
    phone: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {});
  sitters.associate = function(models) {
    // associations can be defined here
    sitters.hasMany(models.reservations)
  };
  return sitters;
};