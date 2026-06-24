const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");


const authRoutes = require("./routes/authRoutes");

const blogRoutes = require("./routes/blogRoutes")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Server is running successfully");
});

app.use("/auth", authRoutes);
app.use("/blog",blogRoutes)
module.exports = app;


