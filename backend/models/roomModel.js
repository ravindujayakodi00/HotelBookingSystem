const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    
});

module.exports = mongoose.model("Room", roomSchema);