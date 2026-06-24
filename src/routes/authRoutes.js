const express = require("express");
const router = express.Router();

const { registerUser, loginUser, logoutUser } = require("../controllers/authControllers");

const { getProfile } = require("../controllers/userController");

const authMiddleware = require("../middlewares/authMiddleware");
const adminOnly = require("../middlewares/roleMiddleware");

//register user
router.post("/register", registerUser);

//loginuser
router.post("/login", loginUser);

//getProfile
router.get("/profile", authMiddleware, getProfile);


//admin
router.get("/admin/dashboard", authMiddleware, adminOnly, (req, res) => {
  res.json({
    message: "Welcome admin",
  });
});


//logout User
router.post("/logout",logoutUser)



module.exports = router;
