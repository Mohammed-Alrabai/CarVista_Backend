const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config();
const jwt = require("jsonwebtoken");

exports.signToken = async (req, res, next) => {
  try {
    const decodedData = req.data;
    const token = await jwt.sign(
      {
        customerData: decodedData,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Token generated successfully",
      data: decodedData,
      token: token,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


exports.verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "No token provided" });
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    res.locals.decoded = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Please Login" });
  }
};
exports.checkToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: "Please Login" });
  } 
  }
