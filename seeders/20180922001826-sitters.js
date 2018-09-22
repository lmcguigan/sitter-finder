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
    return queryInterface.bulkInsert('sitters', [{
      username: "Chris",
      days_available: new Date,
      phone: 2141471548,
      location: 75226,
      photo_url: "https://picsum.photos/233/200?image=1012",
      service: "Dog Walking",
      rating: 5,
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      username: "Karen",
      days_available: new Date,
      phone: 2145550938,
      location: 75226,
      photo_url: "https://picsum.photos/233/200?image=1005",
      service: "Dog Walking",
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: "Allison",
      days_available: new Date,
      phone: 2145550938,
      location: 75201,
      photo_url: "https://picsum.photos/233/200?image=1027",
      service: "Drop-in visits",
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  
  ]

    )
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('sitters', null, {});
  }
};
