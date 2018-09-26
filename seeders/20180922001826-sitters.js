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

    },
    {
      username: "Karen",
      days_available: new Date,
      phone: 2145550938,
      location: 75226,
      photo_url: "https://picsum.photos/233/200?image=1005",
      service: "Dog Walking",
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
     {
      username: "Allison",
      days_available: new Date,
      phone: 2149259882,
      location: 75201,
      photo_url: "https://picsum.photos/233/200?image=1027",
      service: "Drop-in visits",
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: "Ciara",
      days_available: new Date,
      phone: 2148256787,
      location: 75217,
      photo_url: "https://picsum.photos/233/200?image=1011",
      service: "Boarding",
      rating: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: "John",
      days_available: new Date,
      phone: 2149918726,
      location: 75214,
      photo_url: "https://picsum.photos/233/200?image=856",
      service: "Dog Walking",
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: "Mike",
      days_available: new Date,
      phone: 2145551238,
      location: 75080,
      photo_url: "https://picsum.photos/233/200?image=1013",
      service: "Boarding",
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: "Becca",
      days_available: new Date,
      phone: 9722551238,
      location: 75201,
      photo_url: "https://picsum.photos/233/200?image=1028",
      service: "Dog Walking",
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: "Lisa",
      days_available: new Date,
      phone: 2145471248,
      location: 75211,
      photo_url: "https://picsum.photos/233/200?image=1008",
      service: "Boarding",
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: "Justin",
      days_available: new Date,
      phone: 2144571245,
      location: 75260,
      photo_url: "https://picsum.photos/233/200?image=1012",
      service: "Boarding",
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: "Liz",
      days_available: new Date,
      phone: 9725841438,
      location: 75235,
      photo_url: "https://picsum.photos/233/200?image=997",
      service: "Boarding",
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      username: "Frances",
      days_available: new Date,
      phone: 2145551238,
      location: 75242,
      photo_url: "https://picsum.photos/233/200?image=979",
      service: "Boarding",
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: "Mike",
      days_available: new Date,
      phone: 2145551238,
      location: 75238,
      photo_url: "https://picsum.photos/233/200?image=1012",
      service: "Boarding",
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: "Edward",
      days_available: new Date,
      phone: 2148675309,
      location: 75205,
      photo_url: "https://picsum.photos/233/200?image=1062",
      service: "Boarding",
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      username: "Jazmine",
      days_available: new Date,
      phone: 2148679546,
      location: 75221,
      photo_url: "https://picsum.photos/233/200?image=778",
      service: "Dog Walking",
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      username: "Julia",
      days_available: new Date,
      phone: 2148514119,
      location: 75218,
      photo_url: "https://picsum.photos/233/200?image=777",
      service: "Boarding",
      rating: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: "Austin",
      days_available: new Date,
      phone: 214867775,
      location: 75230,
      photo_url: "https://picsum.photos/233/200?image=775",
      service: "Dog Walking",
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      username: "Josh",
      days_available: new Date,
      phone: 214862159,
      location: 75357,
      photo_url: "https://picsum.photos/233/200?image=770",
      service: "Boarding",
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      username: "Jessica",
      days_available: new Date,
      phone: 2148691547,
      location: 75342,
      photo_url: "https://picsum.photos/233/200?image=656",
      service: "Dog Walking",
      rating: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      username: "Robert",
      days_available: new Date,
      phone: 2142411219,
      location: 75201,
      photo_url: "https://picsum.photos/233/200?image=375",
      service: "Boarding",
      rating: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },

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
