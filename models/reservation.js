'use strict';
module.exports = (sequelize, DataTypes) => {
  const reservation = sequelize.define('reservation', {
    date: DataTypes.DATE,
    customer_id: DataTypes.INTEGER,
    sitter_id: DataTypes.INTEGER,
    pet_id: DataTypes.INTEGER,
    service: DataTypes.STRING
  }, {});
  reservation.associate = function(models) {
    // associations can be defined here
  };
  return reservation;
};