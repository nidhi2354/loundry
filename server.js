const dotenv = require("dotenv");

const express = require("express");

const app = require("./src/app");

dotenv.config();

const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
