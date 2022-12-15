const express = require('express');

const { getAllUsers, getUser, deleteUser, updateUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);

module.exports = router