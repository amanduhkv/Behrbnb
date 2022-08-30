const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage } = require('../../db/models');


router.get('/current', requireAuth, async(req, res) => {
  const currentUserId = req.user.id
  const currentUserReview = await Review.findAll({
    where: {
      userId: currentUserId
    },
    attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt'],
    include: [
      {model: User},
      {model: Spot},
      {model: ReviewImage}
    ]
  });
  res.json({Reviews: currentUserReview});
})


router.post('/:reviewId/images', requireAuth, async(req, res) => {
  const { url } = req.body;

  const findReview = await Review.findByPk(req.params.reviewId);

  if(!findReview) {
    return res
      .status(404)
      .json({
        "message": "Review couldn't be found",
        "statusCode": 404
      })
  };

  const images = await ReviewImage.findAll({
    where: {
      reviewId: findReview.id
    }
  });

  if(images.length >= 10) {
    return res
      .status(403)
      .json({
        "message": "Maximum number of images for this resource was reached",
        "statusCode": 403
      })
  }

  const newReview = await ReviewImage.create({
    reviewId: findReview.id,
    url,
  });
  return res.json(newReview);
});


module.exports = router;
