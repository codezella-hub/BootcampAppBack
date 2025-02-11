const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const generateTokenAndSetCookies = require ('../utils/generateTokenAndSetCookies')

const sendVerificationEmail = require("../mailtrap/emails");

async function signUp (req,res ){
    const {name,email,password} = req.body;
  try{
     if(!email || !password || !name){
        throw new Error('Please fill in all fields');
     }
     const userAlreadyExist = await User.findOne({email});
     console.log("userAlreadyExsit", userAlreadyExist);
     if(userAlreadyExist){
        return res.status(400).json({success: false,message:'User Alredy exist'});
     }

     const hashedPassword = await bcryptjs.hash(password,10);
     const verificationToken =  Math.floor(100000 + Math.random() * 900000).toString();
     const user = new User({
        name,
        email,
        password:hashedPassword,
        verificationToken,
        verificationTokenExpiresAt : Date.now() + 24 * 60 * 60 * 1000 // 24 hours

        });
        await user.save();
        // jwt 
        generateTokenAndSetCookies(res,user._id);
        await sendVerificationEmail(user.email,verificationToken)
        res.status(201).json({
            success:true,
            message:'User created successfully',
            user: {
                ...user._doc,
                password: undefined,
            }
        });
  }catch(error){
    return res.status(400).json({success: false,message: error.message});
  }
}


export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try{
        const user = await User.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() },
		});



		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
		}
      
	    
	

		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;
		await user.save();

		//await sendWelcomeEmail(user.email, user.name);

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


async function login (req,res ){
    res.send("login route")
    
}

async function logout (req,res ){
    res.send("logout route")
    
}

module.exports = {
    
    signUp,
    login,
    logout,
    verifyEmail
    
    
    
};