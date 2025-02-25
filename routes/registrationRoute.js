const express = require("express");
const router = express.Router();
const { signUp,verifyEmail} = require("../controller/registraionController");

const validateUser = require("../middleware/UserValidate");




router.post("/register",signUp); 

router.post("/verify-email",verifyEmail);










module.exports = router;