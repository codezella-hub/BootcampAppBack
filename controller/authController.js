
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const  generateTokenAndSetCookies  = require("../utilis/generateTokenAndSetCookies");



const login = async (req,res) => {
    const {email,password} = req.body;
      try{
           if(!email || !password){
            throw new Error("All input required !!");
           }
           const user = await User.findOne({email});
           if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
          }
  
          const isPasswordValid = await bcryptjs.compare(password, user.password);
             if (!isPasswordValid) {
                 return res.status(400).json({ success: false, message: "Invalid credentials" });
              }
  
          generateTokenAndSetCookies(res, user._id,user.role);
  
          user.lastLogin = new Date();
               await user.save();
  
           res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
              ...user._doc,
              password: undefined,
            },
          });
      }catch(error){
  
        res.status(400).json({ success: false, message: error.message });
      }
  }


  const logout = async (req,res) => {
    res.clearCookie("token");
      res.status(200).json({ success: true, message: "Logged out successfully" });
  }
  const checkAuth = async (req, res) => {
    try{
      const user = await User.findById(req.userId).select("-password");
          if (!user) {
              return res.status(400).json({ success: false, message: "User not found" });
          }
  
          res.status(200).json({ success: true, user });
    }catch(error){
      console.log("Error in checkAuth ", error);
          res.status(400).json({ success: false, message: error.message });
    }
  }
// Export all functions
module.exports = {
    login,
    logout,
    checkAuth
};