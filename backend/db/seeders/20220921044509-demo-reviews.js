'use strict';

const { Review, Spot } = require('../models');

const reviews = [
  {
    userId: 2,
    spotId: 1,
    review: "This place was cooool",
    stars: 4
  },
  {
    userId: 3,
    spotId: 1,
    review: "I was f-f-free-freezing",
    stars: 2
  },
  {
    userId: 1,
    spotId: 3,
    review: "Kung fu pandas",
    stars: 5
  },
  {
    userId: 4,
    spotId: 5,
    review: "Have you seen Nemo?",
    stars: 3
  },
  {
    userId: 5,
    spotId: 4,
    review: "Livin on Space Mountain",
    stars: 5
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    for (let reviewInfo of reviews) {
      const { userId, spotId, review, stars } = reviewInfo;
      const foundSpot = await Spot.findOne({
        where: {id: spotId}
      });
      await Review.create({
        userId,
        spotId: foundSpot.id,
        review,
        stars
      })
    }
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
    await queryInterface.bulkDelete('Reviews', {
      where: { id: reviews.map(review => review.id )}
    }, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
