const mongoose = require("mongoose");

const reportsSchema = new mongoose.Schema({
    date: Date,

    // Relations with other models
    Transaction: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction",
        }
    ],
    Rental: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rental",
        }
    ]
},{
    timestamps: true,
})

const Reports = mongoose.model("Reports", reportsSchema);

module.exports = Reports;