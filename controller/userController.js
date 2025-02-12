const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const User = require('../models/user');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Ensure uploads folder exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Multer middleware
const upload = multer({ storage });

// Register user
async function register(req, res) {
    try {
        const { fullName, birthOfDate, cin, phoneNumber, email, password } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        // Check if fields are empty and return specific error messages
        if (!fullName) return res.status(400).json({ message: 'Full name is required' });
        if (!birthOfDate) return res.status(400).json({ message: 'Birth date is required' });
        if (!cin) return res.status(400).json({ message: 'CIN is required' });
        if (!phoneNumber) return res.status(400).json({ message: 'Phone number is required' });
        if (!email) return res.status(400).json({ message: 'Email is required' });
        if (!password) return res.status(400).json({ message: 'Password is required' });
        if (!image) return res.status(400).json({ message: 'Image is required' });

        // Validate CIN and Phone Number (must be exactly 8 digits)
        if (!/^\d{8}$/.test(cin)) {
            return res.status(400).json({ message: 'CIN must be exactly 8 digits' });
        }
        if (!/^\d{8}$/.test(phoneNumber)) {
            return res.status(400).json({ message: 'Phone number must be exactly 8 digits' });
        }

        // Check if CIN exists
        const existingCin = await User.findOne({ cin });
        if (existingCin) {
            return res.status(400).json({ message: 'CIN already exists' });
        }

        // Check if Phone Number exists
        const existingPhone = await User.findOne({ phoneNumber });
        if (existingPhone) {
            return res.status(400).json({ message: 'Phone number already exists' });
        }

        // Check if Email exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user and save to database
        const newUser = new User({ fullName, birthOfDate, cin, phoneNumber, email, image, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error registering user');
    }
}

// Login user
async function login(req, res) {
    try {
        console.log(req.body); // Log the incoming request body
        const { email, password } = req.body;
        
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ 
                errors: { 
                    email: 'Email is required', 
                    password: 'Password is required' 
                } 
            });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ errors: { email: 'email or password are inccorect' } });
        }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: { password: 'Invalid credentials' } });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: '1h' } // Token expiry time (1 hour)
        );

        // Respond with the token
        res.status(200).json({
            message: 'Login successful',
            token // Send the token in the response
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error logging in' });
    }
}


// Logout user (no token to invalidate)
function logout(req, res) {
    res.status(200).json({ message: 'Successfully logged out' });
}

// Add new user (with image upload)
async function addUser(req, res) {
    try {
        const { fullName, birthOfDate, cin, phoneNumber, email } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        if (!fullName || !birthOfDate || !cin || !phoneNumber || !email || !image) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the CIN, phone number, or email already exists
        const existingUser = await User.findOne({
            $or: [{ cin }, { phoneNumber }, { email }]
        });

        if (existingUser) {
            return res.status(400).json({
                message: 'CIN, Phone number, or Email already exists'
            });
        }

        const newUser = new User({ fullName, birthOfDate, cin, phoneNumber, email, image });
        await newUser.save();

        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving user');
    }
}

// Update user by ID (with optional image upload)
async function updateUser(req, res) {
    try {
        const { fullName, birthOfDate, cin, phoneNumber, email } = req.body;
        let updateData = { fullName, birthOfDate, cin, phoneNumber, email };

        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating user');
    }
}

// Get all users
async function getUsers(req, res) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching users');
    }
}

// Get a single user by ID
async function getUser(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching user');
    }
}

// Delete user by ID
async function deleteUser(req, res) {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting user');
    }
}

// Export all functions along with `upload` middleware
module.exports = {
    register,
    login,
    addUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    logout,
    upload
};
