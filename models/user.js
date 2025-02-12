const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Regular expression for email validation
const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|esprit\.tn)$/;

// User Schema
const user = new Schema(
    {
        fullName: { type: String, required: true },
        birthOfDate: { type: Date, required: true },
        cin: { 
            type: Number, 
            required: true, 
            validate: {
                validator: function(value) {
                    return /^\d{8}$/.test(value.toString()); // Ensures exactly 8 digits
                },
                message: 'CIN must be exactly 8 digits.'
            }
        },
        phoneNumber: { 
            type: Number, 
            required: true, 
            validate: {
                validator: function(value) {
                    return /^\d{8}$/.test(value.toString()); // Ensures exactly 8 digits
                },
                message: 'Phone number must be exactly 8 digits.'
            }
        },
        email: { 
            type: String, 
            required: true, 
            validate: {
                validator: function(value) {
                    return emailRegex.test(value);
                },
                message: 'Email must be from gmail.com, yahoo.com, or esprit.tn.'
            }
        },
        image: { type: String, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true }  // Adds createdAt and updatedAt automatically
);

module.exports = mongoose.model('User', user);
