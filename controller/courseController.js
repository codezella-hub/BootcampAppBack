const Course = require('../models/course');

// Add new course
async function addCourse(req, res) {
    try {
        const { title, description, price, courseImage, category } = req.body;

        // Check if all required fields are provided
        if (!title || !description || !price || !courseImage || !category) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new course
        const newCourse = new Course({
            title,
            description,
            price,
            courseImage,
            category,
        });

        // Save the course
        await newCourse.save();
        res.status(201).json(newCourse);  // 201 for resource created
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving Course');
    }
}

// Get all courses
async function getCourses(req, res) {
    try {
        const courses = await Course.find().populate('category');  // populate to get category data
        res.status(200).json(courses);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching courses');
    }
}

// Get a single course by ID
async function getCourse(req, res) {
    try {
        const course = await Course.findById(req.params.id).populate('category');  // populate category info
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching course');
    }
}

// Update course by ID
async function updateCourse(req, res) {
    try {
        const { title, description, price, courseImage, category } = req.body;

        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            { title, description, price, courseImage, category },
            { new: true }  // return updated course
        );

        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json(updatedCourse);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating course');
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

// Export all functions
module.exports = {
    addCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
};
