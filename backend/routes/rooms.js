const express = require('express');
const {
    getAllRooms,
    getRoom,
    createRoom,
    deleteRoom,
    updateRoom,
} = require('../controllers/roomController');
const { verifyAdmin } = require('../utils/verifyToken');

const router = express.Router();

// get all
router.get('/', verifyAdmin ,getAllRooms);
// get one
router.get('/:id', verifyAdmin ,getRoom);
// create
router.post('/:hotelid', verifyAdmin , createRoom); 
// delete
router.delete('/:id', verifyAdmin ,deleteRoom);
// update
router.patch('/:id', verifyAdmin , updateRoom);



module.exports = router;