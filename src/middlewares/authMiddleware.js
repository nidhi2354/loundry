const User = require("../models/userModels");
const jwt = require("jsonwebtoken");


const authMiddleware = async (req, res, next) => {
  
  try {
   
    const authHeader = req.headers.authorization;
    

    if (!authHeader) {
     
      return res.status(401).json({
        success: false,
        message: "Token not provided",
      });
    }
   

    const token = authHeader.split(" ")[1];

    console.log(token)

    console.log("secret key is:",process.env.JWT_SECRET);


    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    
       if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // req.user = user;
    console.log("decoded is string:",decoded)

    // req.user = decoded;
    req.user = user;

    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = authMiddleware;
