const express = require('express');

const {requireAuth} = require('../../utils/auth');
const { Booking, Spot, User } = require('../../db/models');

const router = express.Router();

//GET all current user's bookings
router.get('/current', requireAuth, async (req, res) => {
  const currentUserBookings = await Booking.findAll({
    where: {
      userId: req.user.id
    },
    include: Spot
  });
  return res.json({Bookings: currentUserBookings});
})


//UPDATE a booking
router.put('/:bookingId', requireAuth, async (req, res) => {
  const { startDate, endDate } = req.body;
  const updateBooking = await Booking.findByPk(req.params.bookingId);

  if(!startDate || !endDate) {
    return res
      .status(400)
      .json({
        "message": "Validation error",
        "statusCode": 400,
        "errors": {
          "endDate": "endDate cannot come before startDate"
        }
      })
  }
  if(!updateBooking) {
    return res
      .status(404)
      .json({
        "message": "Booking couldn't be found",
        "statusCode": 404
      })
  }

  if(endDate < updateBooking.endDate) {
    return res
      .status(403)
      .json({
        "message": "Past bookings can't be modified",
        "statusCode": 403
      })
  }
  // if(startDate >= updateBooking.startDate || endDate <= updateBooking.endDate) {
  //   return res
  //     .status(403)
  //     .json({
  //       "message": "Sorry, this spot is already booked for the specified dates",
  //       "statusCode": 403,
  //       "errors": {
  //         "startDate": "Start date conflicts with an existing booking",
  //         "endDate": "End date conflicts with an existing booking"
  //       }
  //     })
  // }

  updateBooking.startDate = startDate;
  updateBooking.endDate = endDate;
  updateBooking.update();

  return res.json(updateBooking);
})


//DELETE a booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
  const deleteBooking = await Booking.findByPk(req.params.bookingId);

  if(!deleteBooking) {
    return res
      .status(404)
      .json({
        "message": "Booking couldn't be found",
        "statusCode": 404
      })
  }

  await deleteBooking.destroy();

  return res
    .status(200)
    .json({
      "message": "Successfully deleted",
      "statusCode": 200
    })
})


module.exports = router;
