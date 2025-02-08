const Category = require('../models/category');

// Add a new category
async function addCategory(req, res) {
    try {
        const { title, description } = req.body;

        // Check if all required fields are provided
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        // Create a new category
        const newCategory = new Category({
            title,
            description,
        });

        // Save the category
        await newCategory.save();
        res.status(201).json(newCategory);  // 201 for resource created
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving Category');
    }
}

// Get all categories
async function getCategories(req, res) {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching categories');
    }
}

// Get a single category by ID
async function getCategory(req, res) {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching category');
    }
}

// Update category by ID
async function updateCategory(req, res) {
    try {
        const { title, description } = req.body;

        // Check if at least one field is provided for update
        if (!title && !description) {
            return res.status(400).json({ message: 'At least one field (title or description) is required for update' });
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true }  // return updated category
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(updatedCategory);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating category');
    }
}

// Delete category by ID
async function deleteCategory(req, res) {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);

        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting category');
    }
}

// Export all functions
module.exports = {
    addCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
};
