const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');

//GET all spots owned by current user
router.get('/current', requireAuth, async (req, res) => {
  const currentUserId = req.user.id

  const spots = await Spot.findAll({
    where: {
      ownerId: currentUserId
    }
  });

  const updatedSpot = [];

  for (let aSpot of spots) {
    let thisSpot = aSpot.toJSON();

    const sumOfReviews = await Review.sum('stars', {
      where: {spotId: thisSpot.id}
    })
    const allReviews = await Review.count();
    const avgRating = (sumOfReviews / allReviews)
    if(!avgRating) thisSpot.avgRating = 'new'
    else {
    thisSpot.avgRating = Number(avgRating).toFixed(2);
    }

    const previewImage = await SpotImage.findOne({
      where: {
        preview: true,
        spotId: thisSpot.id
      }
    });

    if (previewImage) {
      thisSpot.previewImage = previewImage.url
    }
    else {
      thisSpot.previewImage = 'Preview image currently does not exist'
    }
    updatedSpot.push(thisSpot)
  }
  return res.json({ Spots: updatedSpot });
});


//GET all bookings for a spot based on spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if(!spot) {
    return res
      .status(404)
      .json({
        "message": "Spot couldn't be found",
        "statusCode": 404
      })
  }
  //if you ARE NOT the owner of the spot
  else if (req.user.id !== spot.ownerId) {
    const bookings = await Booking.findAll({
      where: {
        spotId: spot.id
      },
      attributes: ['id', 'spotId', 'startDate', 'endDate']
    })
    return res.json({Bookings: bookings})
  }
  //if you ARE the owner of the spot
  else if (req.user.id === spot.ownerId) {
    const bookings = await Booking.findAll({
      include: {model: User, attributes: ['id', 'firstName', 'lastName']},
      where: {
        spotId: spot.id
      }
    })
    return res.json({Bookings: bookings})
  }
})


//GET reviews by spot id
router.get('/:spotId/reviews', async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if(!spot) {
    return res
      .status(404)
      .json({
        "message": "Spot couldn't be found",
        "statusCode": 404
      })
  }
  const reviewsOfSpot = await Review.findAll({
    where: {
      spotId: spot.id
    },
    attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt'],
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: ReviewImage,
        attributes: {
          exclude: ['reviewId', 'createdAt', 'updatedAt']
        }
      }
    ]
  });
  return res.json({Reviews: reviewsOfSpot})
})


//GET details of a spot by id
router.get('/:spotId', async (req, res) => {
  const spots = await Spot.findByPk(req.params.spotId, {
    include: [
      {
        model: SpotImage,
        attributes: ['id', 'url', 'preview']
      },
      { model: User,
        as: 'Owner',
        attributes: ['id', 'firstName', 'lastName']
      }
    ]
  });
  console.log(spots)

  if (!spots || spots === null) {
    return res
      .status(404)
      .json({
        "message": "Spot couldn't be found",
        "statusCode": 404
      })
  }

  const updatedSpot = [];
  const newSpot = spots.toJSON();
    const sumOfReviews = await Review.sum('stars', {
      where: {spotId: newSpot.id}
    })
    const allReviews = await Review.count({
      where: {
        spotId: spots.id
      }
    });
    const avgRating = (sumOfReviews / allReviews)
    if(!avgRating) newSpot.avgStarRating = 'new'
    else {
    newSpot.numReviews = allReviews
    newSpot.avgStarRating = Number(avgRating).toFixed(2);
    }

    updatedSpot.push(newSpot)

  return res.json({ Spots: updatedSpot });
});


//GET all spots
router.get('/', async (req, res, next) => {
  //query parameters
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

  if(!size || size > 20) {
    size = 20
  }
  if(!page) {
    page = 1
  }
  if(size <= 0 || page <= 0 || minPrice <= 0 || maxPrice <= 0) {
    return res
      .status(400)
      .json({
        "message": "Validation Error",
        "statusCode": 400,
        "errors": {
          "page": "Page must be greater than or equal to 0",
          "size": "Size must be greater than or equal to 0",
          "maxLat": "Maximum latitude is invalid",
          "minLat": "Minimum latitude is invalid",
          "minLng": "Maximum longitude is invalid",
          "maxLng": "Minimum longitude is invalid",
          "minPrice": "Maximum price must be greater than or equal to 0",
          "maxPrice": "Minimum price must be greater than or equal to 0"
        }
      })
  }

  size = parseInt(size);
  page = parseInt(page);

  let pagination = {};
  if(page > 0 && size > 0) {
    pagination.limit = size;
    pagination.offset = size * (page - 1);
  }

  //query to get all spots
  const spots = await Spot.findAll({
    ...pagination
  });

  const updatedSpot = [];

  for (let aSpot of spots) {
    let thisSpot = aSpot.toJSON();

    const sumOfReviews = await Review.sum('stars', {
      where: {spotId: thisSpot.id}
    })
    const allReviews = await Review.count({
      where: {spotId: thisSpot.id}
    });
    const avgRating = (sumOfReviews / allReviews)

    if(!avgRating) thisSpot.avgRating = 'new'
    else {
    thisSpot.avgRating = Number(avgRating).toFixed(2);
    }

    const previewImage = await SpotImage.findOne({
      where: {
        preview: true,
        spotId: thisSpot.id
      }
    });

    if (previewImage) {
      thisSpot.previewImage = previewImage.url
    }
    else {
      thisSpot.previewImage = 'Preview image currently does not exist'
    }
    updatedSpot.push(thisSpot)
  }
  return res.json({ Spots: updatedSpot, page, size });
});


//CREATE booking from spot based on spot id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
  const { startDate, endDate } = req.body;

  const spot = await Spot.findByPk(req.params.spotId);
  if(!spot) {
    return res
      .status(404)
      .json({
        "message": "Spot couldn't be found",
        "statusCode": 404
      })
  }
  // console.log(req.params.spotId)
  const currentBookings = await Booking.findAll({
    where: {
      spotId: spot.id
    }
  })

  if(!startDate || !endDate) {
    return res
      .status(400)
      .json({
        "message": "Please choose check-in and checkout dates.",
        "statusCode": 400,
        "errors": {
          "endDate": "endDate cannot be on or before startDate"
        }
      })
  }
  if(endDate <= startDate) {
    return res
      .status(400)
      .json({
        "message": "The checkout date cannot be on or before the check-in date.",
        "statusCode": 400,
        "errors": {
          "endDate": "endDate cannot be on or before startDate"
        }
      })
  }

  for (let aBooking of currentBookings) {
    if(aBooking.startDate >= startDate && aBooking.endDate <= endDate || aBooking.startDate <= startDate && aBooking.endDate >= endDate) {
      return res
        .status(403)
        .json({
          "message": "Sorry, this spot is already booked for the specified dates",
          "statusCode": 403,
          "errors": {
            "startDate": "Start date conflicts with an existing booking",
            "endDate": "End date conflicts with an existing booking"
          }
        })
    }
  }

    const bookingSpot = await Booking.create({
      spotId: spot.id,
      userId: req.user.id,
      startDate,
      endDate
    });
    return res.json(bookingSpot);

})


//CREATE an image for a spot
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
  const { url, preview } = req.body;

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
    preview,
  });
  res.json({
    id: spotImage.id,
    url,
    preview
  });
});

router.post('/:spotId/reviews', requireAuth, async(req, res) => {
  const { review, stars } = req.body;
  const findSpot = await Spot.findByPk(req.params.spotId);
  const previousReview = await Review.findOne({
    where: {
      userId: req.user.id,
      spotId: req.params.spotId
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
  if(previousReview) {
    return res
      .status(403)
      .json({
        "message": "User already has a review for this spot",
        "statusCode": 403
      })
  }


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


//EDIT a spot
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
  spot.save();

  return res.json(spot);
});


//DELETE a spot
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
