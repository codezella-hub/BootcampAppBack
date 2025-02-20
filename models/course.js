const mongo = require('mongoose');
const Schema = mongo.Schema;

// Import the Category model (ensure it's registered first)
//const Category = require('./category');

// Course Schema
const course = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        courseImage: { type: String, required: true },
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },  // Reference to Category model
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to Category model
    },
    { timestamps: true }  // Adds createdAt and updatedAt automatically
);

module.exports = mongo.model('Course', course);
