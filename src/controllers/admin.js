const express = require("express");

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminModel = require("../models/Admin.js");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "ddy8z6gfg",
  api_key: "145413554941927",
  api_secret: "KTXm6sU_Z2Ye55vtzw3P-LEz1oY",
});

exports.createAdmin = async (req, res) => {
  const { firstName, lastName, email, password, gender, phone, age } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const adminData = await adminModel.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
      gender,
      phone,
      age,
    });
    res.status(200).json({
      data: adminData,
    });
  } catch (err) {
    res.status(500).json({
      massage: err.message,
    });
  }
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const adminData = await adminModel.findOne({ email });
    if (!adminData) {
      return res.status(404).json({
        massage: "Admin not found",
      });
    }
    const isMatch = await bcrypt.compare(password, adminData.password);
    if (!isMatch) {
      return res.status(400).json({
        massage: "Invalid Email or Password",
      });
    }
    res.status(200).json({
      data: adminData,
    });
  } catch (err) {
    res.status(500).json({
      massage: err.message,
    });
  }
};

// Admin With Cars
const carsModel = require("../models/Cars.js");

// Get All Cars
exports.getCars = async (req, res) => {
  try {
    const carsData = await carsModel.find();
    res.status(200).json({
      data: carsData,
    });
  } catch (err) {
    res.status(500).json({
      massage: err.message,
    });
  }
};

// Get Cars on limit and page
exports.getCarsPagination = async (req, res) => {
  try {
    let limit = 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    if (req.query.limit) {
      limit = parseInt(req.query.limit);
    }

    const carsData = await carsModel.find().limit(limit).skip(skip);

    res.status(200).json({
      data: carsData,
      currentPage: page,
      length: carsData.length,
      totalPages: Math.ceil(carsData.length / limit),
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get One Car
exports.getOneCar = async (req, res) => {
  try {
    const carData = await carsModel.findById(req.params.id);
    res.status(200).json({
      data: carData,
    });
  } catch (err) {
    res.status(500).json({
      massage: err.message,
    });
  }
};

// Create Car
exports.createCar = async (req, res) => {
    const { carName, carNumber, carModel, carStatus, carType, rentalPrice } = req.body;
  const file = req.files.carImage;
  const cloudImage = await  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    if (err) {
      console.log(err);
    }
    return result.url;
  });
  const urlImage = cloudImage.url;
  try {
    const carData = await carsModel.create({
      carName,
      carNumber,
      carModel,
      carStatus,
      carType,
      carImage: urlImage,
      rentalPrice
    });
    res.status(200).json({
      data: carData,
      message: "Car created",
    });
  } catch (err) {
    res.status(500).json({
      massage: err.message,
    });
  }
};

// Delete Car
exports.deleteCar = async (req, res) => {
  try {
    const carData = await carsModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      data: carData,
      message: "Car deleted",
    });
  } catch (err) {
    res.status(500).json({
      massage: err.message,
    });
  }
};

// Update Car
exports.updateCar = async (req, res) => {
  try {
    const carData = await carsModel.findByIdAndUpdate(req.params.id, req.body);
    const newCarData = await carsModel.findById(req.params.id);
    res.status(200).json({
      data: newCarData,
      message: "Car updated",
    });
  } catch (err) {
    res.status(500).json({
      massage: err.message,
    });
  }
};
