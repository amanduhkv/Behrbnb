const express = require('express');

const {requireAuth} = require('../../utils/auth');
const { ReviewImage } = require('../../db/models');

const router = express.Router();


//DELETE a review image
router.delete('/:imageId', requireAuth, async (req, res) => {
  const deleteReviewImage = await ReviewImage.findByPk(req.params.imageId)

  if(!deleteReviewImage) {
    return res
      .status(404)
      .json({
        "message": "Review Image couldn't be found",
        "statusCode": 404
      })
  }

  await deleteReviewImage.destroy();
  return res
    .status(200)
    .json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
});


module.exports = router;
