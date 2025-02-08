const express = require('express');
const mongo = require('mongoose');
const db = require('./config/db.json');
const userRouter = require('./routes/user');
const categoryRouter = require('./routes/categoryRoute');
const courseRouter = require('./routes/courseRoute');

// Connect to the database
mongo.connect(db.url)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log(err));

var app = express();

// Middleware to parse JSON
app.use(express.json());

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the BootcampAppBack!');
});
//routes
app.use('/api', userRouter);
app.use('/api', categoryRouter);
app.use('/api', courseRouter);

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = app;
