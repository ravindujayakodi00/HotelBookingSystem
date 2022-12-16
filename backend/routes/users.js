const express = require('express');

const { getAllUsers, getUser, deleteUser, updateUser } = require('../controllers/userController');
const verifyToken = require('../utils/verifyToken');

const router = express.Router();

router.get('/checkauthentication', verifyToken, (req, res,next) => {
    res.status(200).json({message: 'You are authorized'});
});

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);

module.exports = router