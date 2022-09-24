'use strict';

const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Patrick',
        lastName: 'Star',
        email: 'wumbo25@user.io',
        username: 'pinheadLarry',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Christopher',
        lastName: 'Robin',
        email: 'hundredacrewoods@user.io',
        username: 'christoperrobin',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Piglet',
        lastName: 'Boots',
        email: 'fearfulshakes@user.io',
        username: 'anxietywho',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Tigger',
        lastName: 'Bounces',
        email: 'bbb-bouncin@user.io',
        username: 'bouncin',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Pooh',
        lastName: 'Bear',
        email: 'honey4ever@user.io',
        username: 'honeylover123',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
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
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
