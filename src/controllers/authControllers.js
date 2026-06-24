const User = require("../models/userModels");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

//user register
const registerUser = async (req, res) => {
  try {
    console.log("aya response")
    const { name, email, phone, password, confirmPassword,role } = req.body;

    console.log(req.body)
    // 1. basic check
    if (!name || !email || !phone || !password || !confirmPassword) {
     
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    

    // 2. password match check
    if (password !== confirmPassword) {

       console.log('hell222')
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

     console.log('hell33')

    // 3. check user already exists
    const userExist = await User.findOne({ email });

    
    if (userExist) {
       console.log('hell55')
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }



    // 4. hash password
    const hashedPassword = await bcrypt.hash(password, 10);

     console.log('hello666');
    // 5. create user
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user : user,
      // user: {
      //   id: user._id,
      //   name: user.name,
      //   email: user.email,
      //   phone: user.phone,
      //   role: user.role,
      // },
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    // Validation
    if (!email || !password) {
      console.log("login 111111")
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // User Check
    const user = await User.findOne({ email });
    console.log("user")

    if (!user) {
  
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Password Check
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

   console.log(process.env.JWT_SECRET)
    // Generate JWT Token
    const token = jwt.sign(
       
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//user logout 
const logoutUser = (req,res)=>{
  return res.status(200).json({
    success:true,
    message:"Logged out successfully"
  })
}
module.exports = { registerUser, loginUser ,logoutUser};

