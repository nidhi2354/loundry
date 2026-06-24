
const User = require("../models/userModels");
const getProfile = async (req, res) => {

  console.log(getProfile)
   try {
    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProfile,
};
