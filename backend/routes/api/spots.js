const express = require('express');
const router = express.Router();

const { Spot } = require('../../db/models');


router.get('/', async(req, res) => {
  const spots = await Spot.findAll();
  return res.json(spots);
});

router.post('/', async(req,res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const newSpot = await Spot.create({
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
})


module.exports = router;
