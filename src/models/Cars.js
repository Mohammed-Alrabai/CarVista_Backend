const mongoose = require("mongoose");

const carsSchema = new mongoose.Schema(
    {
    carName: {
        type: String,
        required: true
    },
    carNumber: {
        type: Number,
        required: true
    },
    carModel: {
        type: String,
        required: true
    },
    carStatus: {
        type: String,
        required: true
    },
    carType: {
        type: String,
        required: true
    },
    carImage: {
        type: String,
    },
    rentalPrice: {
        type: Number,
        required: true
    },
    // Relations with other models
    Driver: {
        type: mongoose.Types.ObjectId,
        ref : "Driver"
    },
    Transaction: {
        type: mongoose.Types.ObjectId,
        ref : "Transaction",
    }
},{
    timestamps: true,
})

const Cars = mongoose.model("Cars", carsSchema);

module.exports = Cars;