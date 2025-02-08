const express = require('express');
const router = express.Router();
const courseController = require('../controller/courseController');

// Add course
router.post('/addCourse', courseController.addCourse);

// Get all courses
router.get('/courses', courseController.getCourses);

// Get a single course by ID
router.get('/course/:id', courseController.getCourse);

// Update a course by ID
router.put('/updateCourse/:id', courseController.updateCourse);

// Delete a course by ID
router.delete('/deleteCourse/:id', courseController.deleteCourse);

module.exports = router;
