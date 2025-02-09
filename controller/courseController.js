const multer = require('multer');
const path = require('path');
const Course = require('../models/course');
const fs = require('fs');

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
        const { title, description, price, category } = req.body;
        const courseImage = req.file ? `/uploads/${req.file.filename}` : null; // Save correct path

        if (!title || !description || !price || !category || !courseImage) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newCourse = new Course({ title, description, price, courseImage, category });
        await newCourse.save();

        res.status(201).json(newCourse);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving course');
    }
}

// Update course by ID (with optional image upload)
async function updateCourse(req, res) {
    try {
        const { title, description, price, category } = req.body;
        let updateData = { title, description, price, category };

        if (req.file) {
            updateData.courseImage = `/uploads/${req.file.filename}`;
        }

        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json(updatedCourse);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating course');
    }
}

// Get all courses
async function getCourses(req, res) {
    try {
        const courses = await Course.find().populate('category');
        res.status(200).json(courses);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching courses');
    }
}

// Get a single course by ID
async function getCourse(req, res) {
    try {
        const course = await Course.findById(req.params.id).populate('category');
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
    upload
};
