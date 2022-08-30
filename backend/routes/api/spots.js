const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review } = require('../../db/models');
const user = require('../../db/models/user');

router.get('/current', requireAuth, async (req, res) => {
  const currentUserId = req.user.id

  const spots = await Spot.findAll({
    where: {
      ownerId: currentUserId
    }
  });
  res.json({ Spots: spots });
});

router.get('/:spotId', async (req, res) => {
  const spots = await Spot.findByPk(req.params.spotId, {
    include: [
      { model: SpotImage },
      { model: User, as: 'Owner' }
    ]
  });

  if (!spots) {
    return res
      .status(404)
      .json({
        "message": "Spot couldn't be found",
        "statusCode": 404
      })
  }
  return res.json(spots);
});

router.get('/', async (req, res, next) => {
  const spots = await Spot.findAll();
  return res.json({ Spots: spots });
});

router.post('/:spotId/images', requireAuth, async (req, res, next) => {
  const { url } = req.body;

  const findSpot = await Spot.findByPk(req.params.spotId);

  if (!findSpot) {
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

router.post('/:spotId/reviews', requireAuth, async(req, res) => {
  const { review, stars } = req.body;
  const findSpot = await Spot.findByPk(req.params.spotId);
  const previousReview = await Review.findOne({
    where: {
      userId: req.user.id
    }
  })

  if(!findSpot) {
    return res
      .status(404)
      .json({
        "message": "Spot couldn't be found",
        "statusCode": 404
      })
  }
  if(!review || !stars) {
    return res
      .status(400)
      .json({
        "message": "Validation error",
        "statusCode": 400,
        "errors": {
          "review": "Review text is required",
          "stars": "Stars must be an integer from 1 to 5",
        }
      })
  }
  // if(previousReview) {
  //   return res
  //     .status(403)
  //     .json({
  //       "message": "User already has a review for this spot",
  //       "statusCode": 403
  //     })
  // }


  const spotReview = await Review.create({
    userId: req.user.id,
    spotId: findSpot.id,
    review,
    stars
  })
  res.json(spotReview)
})

router.post('/', requireAuth, async (req, res, next) => {
  const { ownerId, address, city, state, country, lat, lng, name, description, price } = req.body;


  if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
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
    ownerId: req.user.id,
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

router.put('/:spotId', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  if (!spot) {
    return res
      .status(404)
      .json({
        "message": "Spot couldn't be found",
        "statusCode": 404
      })
  }
  if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price) {
    return res
      .status(400)
      .json({
        "message": "Validation Error",
        "statusCode": 400,
        "errors": {
          "address": "Street address is required",
          "city": "City is required",
          "state": "State is required",
          "country": "Country is required",
          "lat": "Latitude is not valid",
          "lng": "Longitude is not valid",
          "name": "Name must be less than 50 characters",
          "description": "Description is required",
          "price": "Price per day is required"
        }
      })
  }

  spot.address = address
  spot.city = city
  spot.state = state
  spot.country = country
  spot.lat = lat
  spot.lng = lng
  spot.name = name
  spot.description = description
  spot.price = price
  spot.update();

  return res.json(spot);
});

router.delete('/:spotId', requireAuth, async (req, res) => {
  const deleteSpot = await Spot.findByPk(req.params.spotId);
  if (!deleteSpot) {
    return res
      .status(404)
      .json({
        "message": "Spot couldn't be found",
        "statusCode": 404
      })
  }

  await deleteSpot.destroy();

  return res
    .status(200)
    .json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
})


module.exports = router;
