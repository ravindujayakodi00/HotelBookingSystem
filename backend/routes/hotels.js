const express = require('express');

const { getAllHotels, getHotel, createHotel, deleteHotel, updateHotel } = require('../controllers/hotelController');

const router = express.Router();

// get all
router.get('/', getAllHotels);
// get one
router.get('/:id', getHotel);
// create
router.post('/', createHotel);
// delete
router.delete('/:id', deleteHotel);
// update
router.patch('/:id', updateHotel);



module.exports = router;