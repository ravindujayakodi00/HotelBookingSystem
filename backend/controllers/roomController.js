const { default: mongoose } = require("mongoose");

const Room = require("../models/roomModel");
const Hotel = require("../models/hotelModel"); 

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
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);
  
    try {
      const savedRoom = await newRoom.save();
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $push: { rooms: savedRoom._id },
        });
      } catch (err) {
        return res.status(500).json(err);
      }
      res.status(200).json(savedRoom);
    } catch (err) {
        return res.status(500).json(err);
    }
};

//delete a room
const deleteRoom = async (req,res) => {
    const hotelId = req.params.hotelid;
    try {
      await Room.findByIdAndDelete(req.params.id);
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $pull: { rooms: req.params.id },
        });
      } catch (err) {
        return res.status(500).json(err);
      }
      res.status(200).json("Room has been deleted.");
    } catch (err) {
        return res.status(500).json(err);
    }
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
