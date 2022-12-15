const { default: mongoose } = require("mongoose");

const User = require("../models/userModel");

const getAllUsers = async (req, res) => {
    const users = await User.find().sort({ createdAt: -1 });

    res.status(200).json(users);
};

const getUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("No user with that id");
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).send("No user with that id");
    }

    res.status(200).json(user);
};


//delete a user
const deleteUser = async (req,res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such a user'});
    }

    const user = await User.findOneAndDelete({_id: id});

    if(!user) {
        return res.status(404).json({error: 'No such a user'});
    }

    res.status(200).json(user);
}

//update a user
const updateUser = async (req,res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such a user'});
    }

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    }, {new: true})

    if(!user) {
        return res.status(404).json({error: 'No such a user'});
    }

    res.status(200).json(user);
}

module.exports = {
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
}
