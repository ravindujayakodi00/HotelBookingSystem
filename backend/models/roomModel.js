const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    maxPeople: {
        type: Number,
        required: true,
    },
    desc: {
        type: Number,
        required: true,
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: Date}}]
    
}, { timestamps: true });

[
    {number: 101, unavailableDates: []},
    {number: 102, unavailableDates: []},
    {number: 103, unavailableDates: []},
    {number: 104, unavailableDates: []},
    {number: 105, unavailableDates: []},
]

module.exports = mongoose.model("Room", roomSchema);