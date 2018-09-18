'use strict';
module.exports = (sequelize, DataTypes) => {
  const pet = sequelize.define('pet', {
    customer_id: DataTypes.INTEGER,
    size: DataTypes.STRING,
    age: DataTypes.INTEGER,
    friendly: DataTypes.BOOLEAN
  }, {});
  pet.associate = function(models) {
    // associations can be defined here
  };
  return pet;
};