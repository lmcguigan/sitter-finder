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
   return queryInterface.bulkInsert('reservations',[{
     date: new Date,
     sitter_id: 123456,
     pet_id:1234,
     service:"Dog Walking",
     sittername:"Jessica",
     createdAt: new Date(),
     updatedAt: new Date()   

   },
   {
   date: new Date,
   sitter_id: 123,
   pet_id:12,
   service:"Dog Walking",
   sittername:"Jacob",
   createdAt: new Date(),
   updatedAt: new Date() 
   
  }]

  )
  },

  
  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete('reservations', null, {});
  }
};
