const mongo = require('mongoose');
const Schema = mongo.Schema;

// Category Schema
const category = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        categoryImage: { type: String, required: true },
    },
    { timestamps: true }  // Adds createdAt and updatedAt automatically
);

module.exports = mongo.model('Category', category);
