'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sitters = sequelize.define('sitters', {
    username: DataTypes.STRING,
    days_available: DataTypes.DATE,
    photo_url: DataTypes.STRING,
    service: DataTypes.STRING,
    location: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {});
  Sitters.associate = function(models) {
    // associations can be defined here
    Sitters.hasMany(models.reservations)
  };
  return Sitters;
};