const { default: mongoose } = require("mongoose");

const Hotel = require("../models/hotelModel");

const getAllHotels = async (req, res) => {
    const hotels = await Hotel.find().sort({ createdAt: -1 });

    res.status(200).json(hotels);
};

const getHotel = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("No hotel with that id");
    }

    const hotel = await Hotel.findById(id);

    if (!hotel) {
        return res.status(404).send("No hotel with that id");
    }

    res.status(200).json(hotel);
};

const createHotel = async (req, res) => {
    const { name, type, city, address, distance, photos, discription, title, rating, rooms, cheapestPrice, featured } = req.body;

    try {
        if (!name || !type || !city || !address || !distance || !photos || !discription || !title || !rating || !rooms || !cheapestPrice || !featured) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const hotel = await Hotel.create({ name, type, city, address, distance, photos, discription, title, rating, rooms, cheapestPrice, featured });
        res.status(200).json(hotel);
    } 
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//delete a hotel
const deleteHotel = async (req,res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such a hotel'});
    }

    const hotel = await Hotel.findOneAndDelete({_id: id});

    if(!hotel) {
        return res.status(404).json({error: 'No such a hotel'});
    }

    res.status(200).json(hotel);
}

//update a hotel
const updateHotel = async (req,res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such a hotel'});
    }

    const hotel = await Hotel.findOneAndUpdate({_id: id}, {
        ...req.body
    }, {new: true})

    if(!hotel) {
        return res.status(404).json({error: 'No such a hotel'});
    }

    res.status(200).json(hotel);
}

module.exports = {
    getAllHotels,
    getHotel,
    createHotel,
    deleteHotel,
    updateHotel,
}
