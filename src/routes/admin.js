const express = require("express");
const router = express.Router();

const {
  createAdmin,
  loginAdmin,
  getCars,
  getOneCar,
  createCar,
  deleteCar,
  updateCar,
  getCarsPagination,
} = require("../controllers/admin.js");

router.post("/createAdmin", createAdmin);
router.post("/loginAdmin", loginAdmin);

// Admin With Cars
router.get("/cars", getCars);
router.get("/car/:id", getOneCar);
router.post("/addCar", createCar);
router.delete("/deleteCar/:id", deleteCar);
router.put("/updateCar/:id", updateCar);
router.get("/carsPagination/", getCarsPagination);



module.exports = router;
