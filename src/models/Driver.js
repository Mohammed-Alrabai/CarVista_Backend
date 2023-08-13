const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
    name: String,
    commission: Number,
    Car: {
        type: mongoose.Types.ObjectId,
        ref: "Cars"
    }
})

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;