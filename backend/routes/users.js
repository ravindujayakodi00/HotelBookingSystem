const express = require('express');

const { getAllUsers, getUser, deleteUser, updateUser } = require('../controllers/userController');
const { verifyToken, verifyUser, verifyAdmin }= require('../utils/verifyToken');

const router = express.Router();

// router.get('/checkauthentication', verifyToken, (req, res,next) => {
//     res.send("You are authenticated");
// });

// router.get('/checkuser/:id', verifyUser, (req, res,next) => {
//     res.send("Hello user, you are logged in and you can delete your account");
// });

// router.get('/checkadmin/:id', verifyAdmin, (req, res,next) => {
//     res.send("Hello Admin, you are logged in and you can delete all account");
// });

router.get('/', verifyAdmin ,getAllUsers);
router.get('/:id', verifyUser ,getUser);
router.delete('/:id',verifyUser , deleteUser);
router.patch('/:id', verifyUser ,updateUser);

module.exports = router