const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
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
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },

    // Relations with other models
    Transaction: {
      type: mongoose.Types.ObjectId,
      ref: "Transaction",
    }
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;