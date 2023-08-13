const express = require("express");
const router = express.Router();

const {
  createCustomer,
  loginCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
  getAllCustomers,
  registerRental,
  createTransaction,
  getRentalById,
  checkToken,
} = require("../controllers/customer");
const { signToken, verifyToken } = require("../middlewares/auth.js");

router.post("/createCustomer", createCustomer, signToken);
router.post("/loginCustomer", loginCustomer, signToken);
router.delete("/deleteCustomer/:id", verifyToken, deleteCustomer);
router.put("/updateCustomer/:id", verifyToken, updateCustomer);

router.get("/customers", getAllCustomers);
router.get("/customer/:id", getCustomerById);

// rental car
router.post("/rentalCar/:id", registerRental);
router.get("/rentalCar/:id", getRentalById);

// Transaction
router.get("/transaction/:id", createTransaction);

module.exports = router;
