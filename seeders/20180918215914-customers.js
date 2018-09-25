'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('customers', [{
    name: 'John Doe',
    zipcode: 74029,
    email: 'a@g.com',
    password:';sdfa',
    phone: '234-445-7890',
    address: '12 Burger Street, Buffalo, NY',
    createdAt: new Date(),
    updatedAt: new Date()
  },
{
  name: 'Amanda',
    zipcode: 72356,
    email: 'sd@g.com',
    password:'kfg;lkffa',
    phone: '434-001-4490',
    address: '1234 Mango Street, Buffalo, NY',
    createdAt: new Date(),
    updatedAt: new Date()
}
], {});


  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete('customers', null, {});
  }
};
