const express = require('express');
const mongo = require('mongoose');
const db = require('./config/db.json');
const categoryRouter = require('./routes/categoryRoute');
const courseRouter = require('./routes/courseRoute');
const courseDetailsRouter = require('./routes/courseDetailsRoute');
const subCourseRouter = require('./routes/SubCourseRoute');
const videoRouter = require('./routes/videoRoute');
const userRouter = require('./routes/userRoute');
//const AuthRoutes = require('./routes/auth.routes');
const forumRoutes = require('./routes/forumRoutes');
const commentRoutes = require('./routes/commentRoutes');
const likeRoutes = require('./routes/likeRoutes');
const postRoutes = require('./routes/postRoute');

const path = require('path');
require('dotenv').config();
const cors = require('cors');

// Connect to the database
mongo.connect(db.url)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log(err));

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Added this line for form data


// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the BootcampAppBack!');
});


// Routes


const corsOptions = {
  origin: 'http://localhost:5173', // Ensure this matches your frontend port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use('/api', categoryRouter);
app.use('/api', courseRouter);
app.use('/api', courseDetailsRouter);
app.use('/api', subCourseRouter);
app.use('/api', videoRouter);
app.use('/api', userRouter);
app.use('/api',forumRoutes);
app.use('/api',commentRoutes);
app.use('/api',likeRoutes);
app.use('/api',postRoutes);

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = app;
