const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');

// Add category
router.post('/addCategory', categoryController.addCategory);

// Get all categories
router.get('/categories', categoryController.getCategories);

// Get a single category by ID
router.get('/category/:id', categoryController.getCategory);

// Update a category by ID
router.put('/updateCategory/:id', categoryController.updateCategory);

// Delete a category by ID
router.delete('/deleteCategory/:id', categoryController.deleteCategory);

module.exports = router;
