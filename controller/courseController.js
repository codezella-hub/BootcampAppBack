const multer = require('multer');
const path = require('path');
const Course = require('../models/course');
const fs = require('fs');
const mongoose = require('mongoose');

// Ensure uploads folder exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Save images in `uploads/`
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file
    }
});

// Multer middleware
const upload = multer({ storage });

// Add new course (with image upload)
async function addCourse(req, res) {
    try {
        const { 
            title, description, price, prerequisites, objectives, 
            targetAudience, language, courseDuration, rating, subtitles, category, user
        } = req.body;

        const courseImage = req.file ? `/uploads/${req.file.filename}` : null; // Save correct path

        // Validate required fields
        if (!title || !description || !price || !prerequisites || !objectives || !targetAudience ||
            !language || !courseDuration || !rating || !subtitles || !category || !courseImage || !user) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate price and courseDuration as numbers
        if (isNaN(price) || isNaN(courseDuration) || isNaN(rating)) {
            return res.status(400).json({ message: 'Price, course duration, and rating must be numbers' });
        }

        const newCourse = new Course({ 
            title, description, price, courseImage, prerequisites, objectives, 
            targetAudience, language, courseDuration, rating, subtitles, category, user
        });

        await newCourse.save();

        res.status(201).json({ status: (201), message: 'newCourse added successfully', newCourse });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving course');
    }
}

// Update course by ID (with optional image upload)
async function updateCourse(req, res) {
    try {
        const { 
            title, description, price, prerequisites, objectives, 
            targetAudience, language, courseDuration, rating, subtitles, category, user
        } = req.body;

        let updateData = { 
            title, description, price, prerequisites, objectives, 
            targetAudience, language, courseDuration, rating, subtitles, category, user
        };

        if (req.file) {
            updateData.courseImage = `/uploads/${req.file.filename}`;
        }

        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(201).json({ status: (201), message: 'Course updated successfully', updatedCourse });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating course');
    }
}

// Get all courses
async function getCourses(req, res) {
    try {
        const courses = await Course.find().populate('category').populate('user');
        res.status(200).json(courses);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching courses');
    }
}

// Get all courses for a specific user
// Get all courses for a specific user
async function getCoursesByUser(req, res) {
    try {
        const { userId } = req.params;

        // Validate input
        if (!userId) {
            return res.status(400).json({ 
                success: false,
                message: 'User ID is required' 
            });
        }

        // Check if userId is a valid MongoDB ObjectId
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid user ID format' 
            });
        }

        // Find courses and populate related data
        const courses = await Course.find({ user: userId })
            .populate('category')
            .populate('user', '-password') // Exclude sensitive data like password
            .sort({ createdAt: -1 }); // Sort by newest first

        if (!courses || courses.length === 0) {
            return res.status(200).json({ 
                success: true,
                count: 0,
                message: 'No courses found for this user',
                courses: []
            });
        }

        // Successful response
        res.status(200).json({
            success: true,
            count: courses.length,
            courses
        });

    } catch (err) {
        console.error('Error in getCoursesByUser:', err);
        res.status(500).json({ 
            success: false,
            message: 'Server error while fetching courses',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
}

// Get a single course by ID
async function getCourse(req, res) {
    try {
        const course = await Course.findById(req.params.id).populate('category').populate('user');
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching course');
    }
}

// Delete course by ID
async function deleteCourse(req, res) {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting course');
    }
}

// Export all functions along with `upload` middleware
module.exports = {
    addCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
    getCoursesByUser,
    upload
};