const express = require('express');
const router = express.Router();
const courseController = require('../controller/courseController');

// Add course (with image upload)
router.post('/addCourse', courseController.upload.single('courseImage'), courseController.addCourse);

// Get all courses
router.get('/courses', courseController.getCourses);

// Get a single course by ID
router.get('/course/:id', courseController.getCourse);
// Get courses by category ID
router.get('/courseCategory/:title', courseController.getCoursesByCategory);

// Update course by ID (with optional image upload)
router.put('/updateCourse/:id', courseController.upload.single('courseImage'), courseController.updateCourse);

// Delete course by ID
router.delete('/deleteCourse/:id', courseController.deleteCourse);

module.exports = router;
