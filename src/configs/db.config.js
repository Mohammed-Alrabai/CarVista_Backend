const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({});
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
