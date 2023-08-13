const express = require("express");

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const customerModel = require("../models/Customer.js");

// Signup Customer
exports.createCustomer = async (req, res, next) => {
  const { firstName, lastName, email, password, gender, phone, age } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const customerData = await customerModel.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
      gender,
      phone,
      age,
    });
    req.data = customerData;
    next();
  } catch (err) {
    if (err.code === 11000) {
      res.status(500).json({
        massage: "Email or Phone already exists",
      });
    } else {
      res.status(500).json({
        massage: err.message,
      });
    }
  }
};
// Login Customer
exports.loginCustomer = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const customerData = await customerModel.findOne({ email });
    if (!customerData) {
      return res.status(404).json({
        massage: "Invalid Email or Password",
      });
    }
    const isMatch = await bcrypt.compare(password, customerData.password);
    if (!isMatch) {
      return res.status(400).json({
        massage: "Invalid Email or Password",
      });
    }
    req.data = customerData;
    next();
  } catch (err) {
    res.status(500).json({
      massage: err.message,
    });
  }
};
// update Customer
exports.updateCustomer = async (req, res, next) => {
  try {
    const decoded = res.locals.decoded;
    const decodedCustomerId = decoded.customerData._id;
    const customerId = req.params.id;

    if (decodedCustomerId !== customerId) {
      return res.status(403).json({
        message: "You are not allowed to update this customer",
      });
    }

    const customerData = await customerModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    const newCustomerData = await customerModel.findById(req.params.id);

    res.status(200).json({
      data: newCustomerData,
      message: "Customer updated",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// delete Customer
exports.deleteCustomer = async (req, res) => {
  try {
    const decoded = res.locals.decoded;
    const decodedCustomerId = decoded.customerData._id;
    const customerId = req.params.id;
    if (decodedCustomerId !== customerId) {
      return res.status(403).json({
        message: "You are not allowed to delete this customer",
      });
    }

    const customerData = await customerModel.findByIdAndDelete(customerId);
    res.status(200).json({
      data: customerData,
      message: "Customer deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
// get Customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customersData = await customerModel.find();
    res.status(200).json({
      data: customersData,
    });
  } catch (err) {
    res.status(500).json({
      massage: err.message,
    });
  }
};
// get Customer by Id
exports.getCustomerById = async (req, res) => {
  try {
    const customerData = await customerModel.findById(req.params.id);
    res.status(200).json({
      data: customerData,
    });
  } catch (err) {
    res.status(500).json({
      massage: err.message,
    });
  }
};

// Customer Rentals Car
const rentalModel = require("../models/Rental.js");
exports.registerRental = async (req, res) => {
  const carId = req.params.id;
  const {
    customerId,
    rentalDate,
    timeDeparture,
    timeArrival,
    destination,
    returnDate,
    payment,
  } = req.body;
  const calc = await calculateDays(rentalDate, returnDate);

  try {
    const rentalData = await rentalModel.create({
      rentalNumber: generateRentalNumber(),
      rentalDate,
      timeDeparture,
      timeArrival,
      destination,
      returnDate,
      payment,
      Customer: customerId,
      Car: carId,
      days: calc,
    });

    res.status(200).json({
      data: rentalData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err,
    });
  }
};
//Calculating the number of days between a date
function calculateDays(start, end) {
  const date1 = new Date(start);
  const date2 = new Date(end);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
// get Rental by Id
exports.getRentalById = async (req, res) => {
  try {
    const rentalData = await rentalModel.findById(req.params.id);
    res.status(200).json({
      data: rentalData,
    });
  } catch (err) {
    res.status(500).json({
      massage: err.message,
    });
  }
};

function generateRentalNumber() {
  return "R" + Math.floor(Math.random() * 10000000);
}

// Transaction
const transactionsModel = require("../models/Transaction.js");
exports.createTransaction = async (req, res) => {
  const rentalId = req.params.id;
  try {
    const findRental = await rentalModel
      .findById(rentalId)
      .populate("Customer");
    const customerId = findRental.Customer._id;
    const carId = findRental.Car._id;
    const transactionData = await transactionsModel.create({
      Rental: rentalId,
      Customer: customerId,
      Cars: carId,
      date: new Date(),
      transactionNumber: generateTransactionNumber(),
    });
    const newTransactionData = await transactionsModel
      .findById(transactionData._id)
      .populate("Customer")
      .populate("Cars")
      .populate("Rental");
    res.status(200).json({
      data: newTransactionData,
    });
  } catch (err) {
    res.status(500).json({
      massage: err.message,
    });
  }
};

const generateTransactionNumber = () => {
  return "T" + Math.floor(Math.random() * 10000000);
};
