const SubCourse = require('../models/subCourse');

// Create SubCourse
async function createSubCourse(req, res) {
    try {
        const { title, order, course } = req.body;

        if (!title || !order || !course) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newSubCourse = new SubCourse({
            title,
            order,
            course
        });

        await newSubCourse.save();
        res.status(201).json(newSubCourse);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating subCourse');
    }
}
// Get all SubCourses
async function getSubCourses(req, res) {
    try {
        const subCourses = await SubCourse.find().populate('course');  // Populate course reference
        res.status(200).json(subCourses);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching subCourses');
    }
}
// Get a single SubCourse by ID
async function getSubCourse(req, res) {
    try {
        const subCourse = await SubCourse.findById(req.params.id).populate('course');
        if (!subCourse) {
            return res.status(404).json({ message: 'SubCourse not found' });
        }
        res.status(200).json(subCourse);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching subCourse');
    }
}
// Update SubCourse by ID
async function updateSubCourse(req, res) {
    try {
        const { title, order, course } = req.body;
        const updateData = { title, order, course };

        const updatedSubCourse = await SubCourse.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedSubCourse) {
            return res.status(404).json({ message: 'SubCourse not found' });
        }

        res.status(200).json(updatedSubCourse);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating subCourse');
    }
}
// Delete SubCourse by ID
async function deleteSubCourse(req, res) {
    try {
        const deletedSubCourse = await SubCourse.findByIdAndDelete(req.params.id);
        if (!deletedSubCourse) {
            return res.status(404).json({ message: 'SubCourse not found' });
        }
        res.status(200).json({ message: 'SubCourse deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting subCourse');
    }
}
module.exports = {
    createSubCourse,
    getSubCourses,
    getSubCourse,
    updateSubCourse,
    deleteSubCourse
};
