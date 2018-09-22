'use strict';
module.exports = (sequelize, DataTypes) => {
  const reservations = sequelize.define('reservations', {
    date: DataTypes.DATEONLY,
    customerId: DataTypes.INTEGER,
    sitter_id: DataTypes.INTEGER,
    pet_id: DataTypes.INTEGER,
    service: DataTypes.STRING
  }, {});
  reservations.associate = function(models) {
    // associations can be defined here
  };
  return reservations;
};