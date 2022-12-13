const express = require('express');

const { getAllRooms, getRoom, createRoom, deleteRoom, updateRoom } = require('../controllers/roomController');

const router = express.Router();

router.get('/', getAllRooms);
router.get('/:id', getRoom);
router.post('/', createRoom);
router.delete('/:id', deleteRoom);
router.patch('/:id', updateRoom);



module.exports = router;