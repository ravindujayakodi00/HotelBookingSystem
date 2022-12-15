const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        });

        await newUser.save();
        res.status(200).send("User created successfully");
    }catch(error){
        next(error);
    }
}

module.exports = register;