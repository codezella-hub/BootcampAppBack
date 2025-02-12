const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// User registration (with image upload)
router.post('/register', userController.upload.single('image'), userController.register);

// User login
router.post('/login', userController.login);

// Add user (with image upload)
router.post('/addUser', userController.upload.single('image'), userController.addUser);

// Get all users
router.get('/users', userController.getUsers);

// Get a single user by ID
router.get('/user/:id', userController.getUser);

// Update user by ID (with optional image upload)
router.put('/updateUser/:id', userController.upload.single('image'), userController.updateUser);

// Delete user by ID
router.delete('/deleteUser/:id', userController.deleteUser);

// Export the routes
module.exports = router;
