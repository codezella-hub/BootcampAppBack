
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const  generateTokenAndSetCookies  = require("../utilis/generateTokenAndSetCookies");
const { sendVerificationEmail,sendWelcomeEmail } = require("../utilis/email");
const multer = require("multer");
const path = require("path");

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/user");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).single("picture");

const signUp = async (req, res) => {
    console.log('Received body:', req.body); // Montre les données du corps
    console.log('Received file:', req.file);
    // upload(req, res, async (err) => {
    //   if (err) {
    //     return res.status(400).json({ success: false, message: "Image upload failed" });
    //   }
  
      const { firstname, lastname, age, birthdayDate, email, password, phoneNumber, role, gender } = req.body;
      
  
      try {
        // Validation manuelle des données
        if (!firstname || !lastname || !age || !birthdayDate || !email || !password || !phoneNumber || !role || !gender) {
          return res.status(400).json({ success: false, message: "All fields are required!" });
        }
  
      // Ajoutez cette ligne après l'extraction des champs
const parsedAge = parseInt(age, 10); // Convertit l'âge en entier

// Modifiez la vérification de l'âge comme suit
if (isNaN(parsedAge) || parsedAge <= 0 || !Number.isInteger(parsedAge)) {
  return res.status(400).json({ success: false, message: "Age must be a positive integer" });
}
  
        if (!/^\+?[0-9]{7,15}$/.test(phoneNumber)) {
          return res.status(400).json({ success: false, message: "Invalid phone number format" });
        }
  
        if (!["male", "female"].includes(gender)) {
          return res.status(400).json({ success: false, message: "Gender must be either 'male' or 'female'" });
        }
  
        // Vérifiez le format de la date
        const date = new Date(birthdayDate);
        if (isNaN(date.getTime())) {
          return res.status(400).json({ success: false, message: "Invalid date format for birthdayDate" });
        }
  
        // Vérifiez le format de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({ success: false, message: "Invalid email format" });
        }
  
        if (password.length < 6) {
          return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
        }
  
        const userAlreadyExist = await User.findOne({ email });
        if (userAlreadyExist) {
          return res.status(400).json({ success: false, message: "User already exists" });
        }
  
        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
  
        const user = new User({
          firstname,
          lastname,
          age,
          birthdayDate,
         
          email,
          password: hashedPassword,
          phoneNumber,
          numbreOfCourse: 0,
          role,
          gender,
          verificationToken,
          verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24h
        });
  
        await user.save();
  
        // JWT
   
        await sendVerificationEmail(user.email, verificationToken);
  
        res.status(201).json({
          success: true,
          message: "User created successfully",
          user: {
            ...user._doc,
            password: undefined,
            verificationToken: undefined,
          verificationTokenExpiresAt: undefined
          },
        });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
   
  };

  const verifyEmail = async (req,res) => {
    const {code } = req.body;
    try{
      const user = await User.findOne({
       verificationToken: code,
       verificationTokenExpiresAt: { $gt: Date.now() }
     });
     if (!user) {
             return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
         }
     user.isVerified = true;
         user.verificationToken = undefined;
         user.verificationTokenExpiresAt = undefined;
         await user.save();
     await sendWelcomeEmail(user.email, user.name);
 
     res.status(200).json({
             success: true,
             message: "Email verified successfully",
             user: {
                 ...user._doc,
                 password: undefined,
             },
         });
    }catch(error){
     console.log("error in verifyEmail ", error);
         res.status(500).json({ success: false, message: "Server error" });
    }
 }
 
module.exports = {signUp,verifyEmail}














