const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

router.get('/current', requireAuth, async(req,res) => {
  const currentUser = await User.findByPk(req.body.id);

  const spots = await Spot.findAll({
    where: {
      ownerId: currentUser.id
    }
  });
  res.json(spots);
  // res.json(currentUser);
});

router.get('/:spotId', async(req, res) => {
  const spots = await Spot.findByPk(req.params.spotId, {
    include: [
      {model: SpotImage},
      {model: User, as: 'Owner'}
    ]
  });

  if(!spots) {
    return res
      .status(404)
      .json({
        "message": "Spot couldn't be found",
        "statusCode": 404
      })
  }
  return res.json(spots);
});

router.get('/', async(req, res, next) => {
  const spots = await Spot.findAll();
  return res.json(spots);
});

router.post('/:spotId/images', requireAuth, async(req, res, next) => {
  const { url } = req.body;

  const findSpot = await Spot.findByPk(req.params.spotId);

  if(!findSpot) {
    return res
      .status(404)
      .json({
        "message": "Spot couldn't be found",
        "statusCode": 404
      })
  }

  const spotImage = await SpotImage.create({
    spotId: findSpot.id,
    url,
    preview: true,
  });
  res.json(spotImage);
});

router.post('/', requireAuth, async(req,res, next) => {
  const { ownerId, address, city, state, country, lat, lng, name, description, price } = req.body;


  if(!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
    return res.status(400).json({
        message: "Validation Error",
        statusCode: 400,
        errors: [{
          "address": "Street address is required",
          "city": "City is required",
          "state": "State is required",
          "country": "Country is required",
          "lat": "Latitude is not valid",
          "lng": "Longitude is not valid",
          "name": "Name must be less than 50 characters",
          "description": "Description is required",
          "price": "Price per day is required"
        }]
      })
  }

  const newSpot = await Spot.create({
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  });
  return res.json(newSpot);
});




module.exports = router;
