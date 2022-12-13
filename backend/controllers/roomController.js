const { default: mongoose } = require("mongoose");

const Room = require("../models/roomModel");

const getAllRooms = async (req, res) => {
    const rooms = await Room.find().sort({ createdAt: -1 });

    res.status(200).json(rooms);
};

const getRoom = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("No room with that id");
    }

    const room = await Room.findById(id);

    if (!room) {
        return res.status(404).send("No room with that id");
    }

    res.status(200).json(room);
};

const createRoom = async (req, res) => {
    const {name, type, price } = req.body;

    try {
        if (!name || !type || !price) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const room = await Room.create({ name, type, price });
        res.status(200).json(room);
    } 
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//delete a room
const deleteRoom = async (req,res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such a room'});
    }

    const room = await Room.findOneAndDelete({_id: id});

    if(!room) {
        return res.status(404).json({error: 'No such a room'});
    }

    res.status(200).json(room);
}

//update a room
const updateRoom = async (req,res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such a room'});
    }

    const room = await Room.findOneAndUpdate({_id: id}, {
        ...req.body
    }, {new: true})

    if(!room) {
        return res.status(404).json({error: 'No such a room'});
    }

    res.status(200).json(room);
}

module.exports = {
    getAllRooms,
    getRoom,
    createRoom,
    deleteRoom,
    updateRoom,
}
