const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();

const fillUpload = require("express-fileupload");


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(fillUpload({
  useTempFiles: true
}));

// Connect to DB
const connectDB = require("./src/configs/db.config.js");
connectDB();

// Routes Requests
const adminRoutes = require("./src/routes/admin.js");
const customerRoutes = require("./src/routes/customer.js");

// Routes API

// Admin API v1
app.use("/api/v1/admin", adminRoutes);

// Customer API v1
app.use("/api/v1/customer", customerRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log(
    `Listening on port ${process.env.PORT || 8000} on http://localhost:8000`
  );
});
