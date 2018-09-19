'use strict';
module.exports = (sequelize, DataTypes) => {
  const customers = sequelize.define('customers', {
    name: DataTypes.STRING,
    zipcode: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    number_of_pets:DataTypes.INTEGER
  }, {});
  customers.associate = function(models) {
    // associations can be defined here
  };
  return customers;
}; 