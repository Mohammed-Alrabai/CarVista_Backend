const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    transactionNumber: String,
    date: Date,

    // Relations with other models
    Customer: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
      },
    ],
    Cars: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cars",
      },
    ],
    Admin: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
      },
    ],
    Rental: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rental",
      },
    ],
    Reports: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reports",
    },
  },
  {
    timestamps: true,
  }
);

const transaction = mongoose.model("Transaction", transactionSchema);

module.exports = transaction;
