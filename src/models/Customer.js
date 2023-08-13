const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
    },
    Transactions: {
      type: mongoose.Types.ObjectId,
      ref: "Transaction",
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
