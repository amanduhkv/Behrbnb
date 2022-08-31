const express = require('express');

const {requireAuth} = require('../../utils/auth');
const { SpotImage } = require('../../db/models');

const router = express.Router();


router.delete('/:imageId', requireAuth, async (req, res) => {
  const deleteSpotImage = await SpotImage.findByPk(req.params.imageId)

  if(!deleteSpotImage) {
    return res
      .status(404)
      .json({
        "message": "Spot Image couldn't be found",
        "statusCode": 404
      })
  }

  await deleteSpotImage.destroy();
  return res
    .status(200)
    .json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
});


module.exports = router;
