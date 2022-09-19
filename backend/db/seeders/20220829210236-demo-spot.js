'use strict';

const { User, Spot } = require('../models');

const validSpots = [
  {
    ownerId: 1,
    address: "123 Polar Bear Way",
    city: "Arctic",
    state: "Circle",
    country: "United States of America",
    lat: 37.7331,
    lng: 122.5052,
    name: "Ursus maritimus",
    description: "Place where presents are created",
    price: 123,
  },
  {
    ownerId: 2,
    address: "456 Brown Bear Row",
    city: "Big Sur",
    state: "California",
    country: "United States of America",
    lat: 37.7331,
    lng: 122.5052,
    name: "Ursus arctos",
    description: "Place where fires do not flourish",
    price: 456,
  },
  {
    ownerId: 3,
    address: "567 Panda Place",
    city: "Chengdu",
    state: "Sichuan",
    country: "China",
    lat: 37.7331,
    lng: 122.5052,
    name: "Ailuropoda melanoleuca",
    description: "Place where bamboo gets eaten",
    price: 567,
  },
  {
    ownerId: 1,
    address: "789 Sloth Bear Street",
    city: "Caracas",
    state: "California",
    country: "Venezuela",
    lat: 37.7331,
    lng: 122.5052,
    name: "Bradypus tridactylus",
    description: "Sloths? Here? Possibly.",
    price: 789,
  },
  {
    ownerId: 2,
    address: "42 Wallaby Way",
    city: "Sydney",
    state: "New South Wales",
    country: "Australia",
    lat: 37.7331,
    lng: 122.5052,
    name: "SF Zoo",
    description: "Place where Nemo is",
    price: 1010,
  },
  {
    ownerId: 3,
    address: "1111 Salmon Row",
    city: "Maui",
    state: "Hawaii",
    country: "United States of America",
    lat: 37.7331,
    lng: 122.5052,
    name: "Salmonidae",
    description: "Yum",
    price: 1212,
  },
  {
    ownerId: 4,
    address: "777 Disney Row",
    city: "Anaheim",
    state: "California",
    country: "United States of America",
    lat: 37.7331,
    lng: 122.5052,
    name: "DeveloperLand",
    description: "Place where web developers are created",
    price: 777,
  },
  {
    ownerId: 5,
    address: "8888 Koala Creek",
    city: "Eucalyptus",
    state: "Woodland",
    country: "United States of America",
    lat: 37.7331,
    lng: 122.5052,
    name: "Phascolarctos cinereus",
    description: "Koalty kare",
    price: 8888,
  },
  {
    ownerId: 1,
    address: "987 Red Panda Place",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 37.7331,
    lng: 122.5052,
    name: "Ailurus fulgens",
    description: "Place where traditions are kept",
    price: 987,
  },
  {
    ownerId: 2,
    address: "2432 Quokka Way",
    city: "Rotto",
    state: "Island",
    country: "Australia",
    lat: 37.7331,
    lng: 122.5052,
    name: "Setonix brachyurus",
    description: "Place where smiles stay",
    price: 2250,
  },
  {
    ownerId: 3,
    address: "2200 Cabybara Court",
    city: "Guayana City",
    state: "Bolivar",
    country: "Venezuela",
    lat: 37.7331,
    lng: 122.5052,
    name: "Hydrochoerus hydrochaeris",
    description: "Place where ducks hang",
    price: 2200,
  },
  {
    ownerId: 4,
    address: "3450 Prairie Dog Park",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 37.7331,
    lng: 122.5052,
    name: "Cynomys socialis",
    description: "Place where the grass is greener",
    price: 200,
  },
  {
    ownerId: 5,
    address: "7243 Lemur Lane",
    city: "Antananarivo",
    state: "Island",
    country: "Madagascar",
    lat: 37.7331,
    lng: 122.5052,
    name: "Lemuroidea",
    description: "You got hops",
    price: 745,
  },
  {
    ownerId: 1,
    address: "7800 Kanga Court",
    city: "Wallaby",
    state: "California",
    country: "Australia",
    lat: 37.7331,
    lng: 122.5052,
    name: "SF Zoo",
    description: "Said a hip-hop, a hippity-hop",
    price: 745,
  },
  {
    ownerId: 2,
    address: "100 Aker Wood West",
    city: "Hundred Acre",
    state: "Woods",
    country: "United States of America",
    lat: 37.7331,
    lng: 122.5052,
    name: "SF Zoo",
    description: "Got a hankering for some honey",
    price: 75,
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
      await Spot.bulkCreate(validSpots, {
        validate: true
      });
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    for (let spotInfo of validSpots) {
      await Spot.destroy({
        where: spotInfo
      });
    }
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
