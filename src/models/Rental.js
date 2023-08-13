const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
    rentalNumber: {
        type: String,
        required: true,
    },
    rentalDate: {
        type: Date,
    },
    timeDeparture: {
        type: Date,
    },
    timeArrival: {
        type: Date,
    },
    destination: {
        type: String,
    },
    returnDate: {
        type: Date,
        required: true,
    },
    payment: {
        type: Boolean,
        required: true,
    },
    days: {
        type: Number,
    },

    // Relations with other models
    Transaction: {
        type: mongoose.Types.ObjectId,
        ref: "Transaction",
    },
    Reports: {
        type: mongoose.Types.ObjectId,
        ref: "Reports",
    },
    Customer: {
        type: mongoose.Types.ObjectId,
        ref: "Customer",
    },
    Car: {
        type: mongoose.Types.ObjectId,
        ref: "Cars",
    }
},{
    timestamps: true,
})

const Rental = mongoose.model("Rental", rentalSchema);

module.exports = Rental;