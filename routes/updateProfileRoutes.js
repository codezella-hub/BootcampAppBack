const express = require('express');
const router = express.Router();
const { updateProfile, updatePassword, updateProfilePicture,getProfilePicture } = require('../controller/updateProfile');
const verifyToken = require("../middleware/verifyToken");

router.put('/profile', verifyToken, updateProfile);
router.put('/password', verifyToken, updatePassword);
router.put('/profile-picture', verifyToken, updateProfilePicture);
// routes/userRoutes.js
router.get('/profile-picture', verifyToken, getProfilePicture);

module.exports = router;