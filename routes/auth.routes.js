const express = require('express');
const router = express.Router();
const authController = require("../controller/authController");


router.post('/signup',authController.signUp);
router.post('/login',authController.login);
router.post('/logout',authController.logout);
router.post("/verify-email",authController.verifyEmail);





module.exports = router; 