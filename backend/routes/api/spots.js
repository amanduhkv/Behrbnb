const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, User } = require('../../db/models');


router.get('/', async(req, res, next) => {
  const spots = await Spot.findAll();
  return res.json(spots);
});

router.post('/:spotId/images', async(req, res, next) => {
  const { url, preview } = req.body;

  const findSpot = await Spot.findByPk(req.params.spotId);
  const newImage = await Spot.create({})
})

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
