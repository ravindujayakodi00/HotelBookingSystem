const express = require('express');

const { getAllHotels, getHotel, createHotel, deleteHotel, updateHotel } = require('../controllers/hotelController');
const { verifyAdmin } = require('../utils/verifyToken');

const router = express.Router();

// get all
router.get('/', verifyAdmin ,getAllHotels);
// get one
router.get('/:id', verifyAdmin ,getHotel);
// create
router.post('/', verifyAdmin ,createHotel);
// delete
router.delete('/:id', verifyAdmin ,deleteHotel);
// update
router.patch('/:id', verifyAdmin ,updateHotel);



module.exports = router;