const express = require('express');
const mongo = require('mongoose');
const db = require('./config/db.json');
const categoryRouter = require('./routes/categoryRoute');
const courseRouter = require('./routes/courseRoute');
const courseDetailsRouter = require('./routes/courseDetailsRoute');
const subCourseRouter = require('./routes/SubCourseRoute');
const path = require('path');

// Connect to the database
mongo.connect(db.url)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log(err));

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the BootcampAppBack!');
});

// Routes
app.use('/api', categoryRouter);
app.use('/api', courseRouter);
app.use('/api', courseDetailsRouter);
app.use('/api', subCourseRouter);

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = app;
