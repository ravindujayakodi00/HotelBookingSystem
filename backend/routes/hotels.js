const express = require('express');

const { getAllHotels, getHotel, createHotel, deleteHotel, updateHotel } = require('../controllers/hotelController');

const router = express.Router();

router.get('/', getAllHotels);
router.get('/:id', getHotel);
router.post('/', createHotel);
router.delete('/:id', deleteHotel);
router.patch('/:id', updateHotel);



module.exports = router;