const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    birthdayDate: {
        type: Date,
        required: true
    },
    picture: {
        type: String, // URL de l'image
        default: "default.jpg"
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    numbreOfCourse: {
        type: Number,
        default: 0
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role', // Référence au schéma Role
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
